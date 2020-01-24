import buildBody from "@mappers/request/body";

describe("Mapper for request body", () => {
    it("should return a postman body in raw mode", () => {
        const bodyObject = { "Some Key": "Some Value" };
        expect(buildBody(bodyObject)).toHaveProperty("mode", "raw");
    });

    it("should return a postman body with language as json", () => {
        const bodyObject = { "Some Key": "Some Value" };
        expect(buildBody(bodyObject).options.raw.language).toBe("json");
    });

    it("should return a postman body with raw body as string", () => {
        const bodyObject = { "Some Key": "Some Value" };
        const bodyAsStringWithIdent2 = JSON.stringify(bodyObject, null, 2);
        expect(buildBody(bodyObject).raw).toEqual(bodyAsStringWithIdent2);
    });

    it("should throw error with invalid body", () => {
        expect(() => buildBody(null as any)).toThrowError("Invalid body value");
    });
});
