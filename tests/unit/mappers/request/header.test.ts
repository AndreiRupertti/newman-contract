import getHeader from "@mappers/request/header";

describe("Mapper for Collection info", () => {
    it("should return an array of header objects", () => {
        const headers = { string_param: "header value", number_param: "2000" };
        expect(getHeader(headers)).toEqual([
            {
                key: "string_param",
                value: "header value",
                type: "text",
            },
            {
                key: "number_param",
                value: "2000",
                type: "text",
            },
        ]);
    });
});
