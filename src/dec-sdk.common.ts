import * as http from 'tns-core-modules/http';
import { Options } from "./models/options";
import { Interaction } from "./models/interaction";
import { PersonalizationReportParams } from "./models/personalization-report-params";

export class Common {
	private readonly constants = {
		sdkVersion: "nativescript-dec-sdk-1.0.0",
		endpoints: {
			apiServerUrl: "https://api.dec.sitefinity.com"
		},
		headers: {
			authorization: "Authorization",
			datacenterkey: "x-dataintelligence-datacenterkey",
			subject: "x-dataintelligence-subject",
			ids: "x-dataintelligence-ids",
			datasource: "x-dataintelligence-datasource",
			contacts: "x-dataintelligence-contacts",
			sdkVersion: "x-dataintelligence-sdk-version"
		}
	};

	private apiKey: string;
	private authToken: string;
	private source: string;
	private apiServerUrl: string;
	private subjectKey: string;

	private interactions: Array<Interaction>;

	constructor(options: Options) {
		if (!options.apiKey) throw new Error('You must provide the ApiKey for the Data Center.');
		if (!options.source) throw new Error('You must provide the source name of the client.');

		this.apiKey = options.apiKey;
		this.source = options.source;
		this.authToken = options.authToken;
		this.apiServerUrl = options.apiServerUrl || this.constants.endpoints.apiServerUrl;

		this.interactions = [];
	}

	public writeInteraction(interaction: Interaction): void {
		if (!interaction) throw new Error('You must provide "interaction" argument when writing an interaction.');
		if (!interaction.S) throw new Error('The interaction must contain SubjectKey.');

		this.interactions.push(interaction);
	}

	public writeSubjectMetadata(subjectKey, metadata): void {
		if (!subjectKey) throw new Error('You must provide "subjectKey" argument when writing subject metadata.');
		if (!metadata) throw new Error('You must provide "metadata" argument when writing subject metadata.');

		this.writeInteraction({
			S: subjectKey,
			SM: metadata
		});
	}

	public writeObjectMetadata(subjectKey, metadata): void {
		if (!subjectKey) throw new Error('You must provide "subjectKey" argument when writing subject metadata.');
		if (!metadata) throw new Error('You must provide "metadata" argument when writing subject metadata.');

		this.writeInteraction({
			S: subjectKey,
			OM: metadata
		});
	}

	public addMapping(subjectKey, secondSubjectKey, secondDataSource): void {
		this.writeInteraction({
			S: subjectKey,
			MappedTo: [{
				"S": secondSubjectKey,
				"DS": secondDataSource
			}]
		});
	}

	public buildPersonalizationReportInteraction(personalizationReportParams: PersonalizationReportParams): Interaction {
		let interaction: Interaction = {
			S: personalizationReportParams.subjectKey,
			P: 'Visit',
			O: personalizationReportParams.canonicalUrl + '/',
			OM: {
				Id: personalizationReportParams.pageGuid,
				PageId: personalizationReportParams.pageGuid,
				Language: personalizationReportParams.language,
				ContentType: 'Page',
				CanonicalTitle: personalizationReportParams.canonicalTitle,
				CanonicalUrl: personalizationReportParams.canonicalUrl,
				Personalization: [{
					Type: 'Page',
					Segment: personalizationReportParams.segment
				}]
			}
		};

		return interaction;
	}

	public flushData(): void {
		let requestOptions = this.getInteractionsRequestOptions();

		this.makeRequest(requestOptions)
			.then((response) => {
				this.interactions = [];
			})
			.catch((response) => {
				throw new Error("The sending of Interactions to DEC server failed!");
			});
	}

	public isInCampaigns(campaignIds, subjectKey): Promise<any> {
		if (!campaignIds) throw new Error('You must provide "campaignIds" argument when using the "isInCampaigns" method.');
		if (!subjectKey) throw new Error('You must provide "subjectKey" argument when using the "isInCampaigns" method.');

		var headers = {};

		headers[this.constants.headers.subject] = subjectKey;
		headers[this.constants.headers.ids] = campaignIds;
		headers[this.constants.headers.datasource] = this.source;

		return this.makePersonalizationRequest('/analytics/v1/campaigns/isin', headers);
	}

	public isInLeads(scoringIds, subjectKey): Promise<any> {
		if (!scoringIds) throw new Error('You must provide "scoringIds" argument when using the "isInLeads" method.');
		if (!subjectKey) throw new Error('You must provide "subjectKey" argument when using the "isInLeads" method.');

		var headers = {};

		headers[this.constants.headers.subject] = subjectKey;
		headers[this.constants.headers.ids] = scoringIds;
		headers[this.constants.headers.datasource] = this.source;

		return this.makePersonalizationRequest('/analytics/v2/scorings/leads/in', headers);
	}

	public isInPersonas(scoringIds, subjectKey): Promise<any> {
		if (!scoringIds) throw new Error('You must provide "scoringIds" argument when using the "isInPersonas" method.');
		if (!subjectKey) throw new Error('You must provide "subjectKey" argument when using the "isInPersonas" method.');

		var headers = {};

		headers[this.constants.headers.subject] = subjectKey;
		headers[this.constants.headers.ids] = scoringIds;
		headers[this.constants.headers.datasource] = this.source;

		return this.makePersonalizationRequest('/analytics/v1/scorings/personas/in', headers);
	}

	// Private methods

	private getEndpointUrl(): string {
		return this.apiServerUrl + '/collect/v2/data-centers/' + this.apiKey + '/datasources/' + this.source + '/interactions';
	}

	private getInteractionsRequestOptions(headers?): any {
		let url = this.getEndpointUrl();
		let requestOptions = this.getRequestOptions(this.interactions, 'POST', url, headers);

		return requestOptions;
	}

	private getRequestOptions(data, httpMethod, url, headers): any {
		let requestOptions = {
			method: httpMethod,
			url: url,
			contentType: 'application/json',
			headers: headers || {},
			content: data ? JSON.stringify(data) : null
		};

		requestOptions.headers[this.constants.headers.sdkVersion] = this.constants.sdkVersion;

		return requestOptions;
	}

	private makePersonalizationRequest(endpoint, headers): Promise<any> {
		if (!this.authToken) throw new Error('You must provide "authToken" when using the Personalization Client.');

		let url = this.apiServerUrl + endpoint;
		let requestOptions = this.getRequestOptions(null, 'GET', url, headers);

		requestOptions.headers[this.constants.headers.authorization] = this.authToken;
		requestOptions.headers[this.constants.headers.datacenterkey] = this.apiKey;

		return this.makeRequest(requestOptions);
	}

	private makeRequest(requestOptions): Promise<any> {
		if (!requestOptions) throw new Error("options is required.");
		if (!requestOptions.method) throw new Error("options.method is required.");
		if (!requestOptions.url) throw new Error("options.url is required.");

		return new Promise((resolve, reject) => {
			if (requestOptions.contentType) {
				requestOptions.headers["Content-Type"] = requestOptions.contentType;
			}

			http.request(requestOptions).then((response) => {
				if ((response.statusCode >= 200 && response.statusCode < 300) || response.statusCode === 304) {
					resolve(response.content);
				} else {
					reject(response.content);
				}
			}, (error) => {
				reject(error);
			});
		});
	}
}