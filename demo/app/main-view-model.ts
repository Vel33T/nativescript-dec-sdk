import { Observable } from 'tns-core-modules/data/observable';
import { DecClient } from 'nativescript-dec-sdk';
import { Options } from 'nativescript-dec-sdk/models/options';

export class HelloWorldModel extends Observable {
    private decClient: DecClient;
    private readonly options: Options = {
        apiKey: 'testApiKey',
        source: 'testSource'
    };

    public message: string;

    constructor() {
        super();

        this.decClient = new DecClient(this.options);
        this.message = "Hello DEC User!";
    }
}
