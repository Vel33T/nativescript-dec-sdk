var DecClient = require("nativescript-dec-sdk").DecClient;

var options = {
    apiKey: 'testApiKey',
    source: 'testSource'
};
var decClient = new DecClient(options);

describe("writeInteraction function", function() {
    it("exists", function() {
        expect(decClient.writeInteraction).toBeDefined();
    });
});

describe("writeSubjectMetadata function", function() {
    it("exists", function() {
        expect(decClient.writeSubjectMetadata).toBeDefined();
    });
});

describe("writeObjectMetadata function", function() {
    it("exists", function() {
        expect(decClient.writeObjectMetadata).toBeDefined();
    });
});

describe("addMapping function", function() {
    it("exists", function() {
        expect(decClient.addMapping).toBeDefined();
    });
});

describe("buildPersonalizationReportInteraction function", function() {
    it("exists", function() {
        expect(decClient.buildPersonalizationReportInteraction).toBeDefined();
    });
});

describe("flushData function", function() {
    it("exists", function() {
        expect(decClient.flushData).toBeDefined();
    });
});

describe("isInCampaigns function", function() {
    it("exists", function() {
        expect(decClient.isInCampaigns).toBeDefined();
    });
});

describe("isInLeads function", function() {
    it("exists", function() {
        expect(decClient.isInLeads).toBeDefined();
    });
});

describe("isInPersonas function", function() {
    it("exists", function() {
        expect(decClient.isInPersonas).toBeDefined();
    });
});