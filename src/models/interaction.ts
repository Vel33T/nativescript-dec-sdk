/** A model of the interaction object send to DEC */
export class Interaction {

    /** The Interaction's Subject/SubjectKey. */
    S: string;

    /** The Interaction's Predicate. */
    P?: string;

    /** The Interaction's Object. */
    O?: string;

    /** The Interaction's Subject Metadata. */
    SM?: any;

    /** The Interaction's Object Metadata. */
    OM?: any;

    /** The Interaction's Mapping. */
    MappedTo?: Array<any>;
}