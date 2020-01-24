import getQuery from "@mappers/request/query";

describe("Mapper for Collection info", () => {
    it("should return an array of header objects", () => {
        const query = { param1: "param value", param2: "2000" };
        expect(getQuery(query)).toEqual([
            {
                key: "param1",
                value: "param value",
            },
            {
                key: "param2",
                value: "2000",
            },
        ]);
    });
});
