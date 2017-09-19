/** A class with the properties that are needed for the generation of Personalization report interaction. */
export class PersonalizationReportParams {

      /** The Subject key of the Application's user. */
      subjectKey: string;

      /** The guid of the page currently personalized. */
      pageGuid: string;

      /** The title of the page currently personalized. */
      canonicalTitle: string;
      
      /** The url of the page currently personalized. */
      canonicalUrl: string;

      /** The segment by which the page is personalized - 
       * the Persona, the Lead Scoring or the Campaign.
       */
      segment: string;

      /** The language of the page currently personalized. */
      language: string;
}