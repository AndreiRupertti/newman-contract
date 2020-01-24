import buildUrl from "@mappers/request/url";

describe("Mapper for url", () => {
    it("should return a postman url from string endpoint", () => {
        const endpoint: any = "https://some-endpoint.com";
        expect(buildUrl(endpoint)).toEqual({
            host: ["some-endpoint", "com"],
            path: [""],
            query: [],
            protocol: "https",
        });
    });

    it("should find query from endpoint string", () => {
        const endpoint: any = "https://some-endpoint.com/path?key1=value1&key2=value2";
        expect(buildUrl(endpoint)).toEqual({
            host: ["some-endpoint", "com"],
            path: ["path"],
            query: [
                { key: "key1", value: "value1" },
                { key: "key2", value: "value2" },
            ],
            protocol: "https",
        });
    });

    it("should give priority to options.query over endpoint string", () => {
        const endpoint: any = "https://some-endpoint.com/path?query=value";
        const query = { param: "This param must override endpoint query" };
        expect(buildUrl(endpoint, { query })).toEqual({
            host: ["some-endpoint", "com"],
            path: ["path"],
            query: [
                {
                    key: "param",
                    value: "This param must override endpoint query",
                },
            ],
            protocol: "https",
        });
    });

    it("should throw error for invalid endpoint format", () => {
        const wrongEndpoint: any = "Not a url";
        expect(() => buildUrl(wrongEndpoint)).toThrowError("Invalid endpoint");
    });
});
