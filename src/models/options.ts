/** A class representing the configuration options object needed for DEC client initialization. */
export class Options {

    /** The Application key of your DEC Data center. */
    apiKey: string;

    /** The data source name of the client. */
    source: string;

    /** The Authentication token of your DEC Data center. Needed for the use of the Personalization features. */
    authToken?: string;

    /** The url to your Data center. Only needed if it is a custom one. */
    apiServerUrl?: string;
}