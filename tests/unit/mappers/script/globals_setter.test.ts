import * as uuid from "@common/uuid";
import buildGlobalSetterEvent from "@mappers/script/globals_setter";
import { EventTypes } from "@src/constants";

const fakeUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

describe("Mapper for Collection Event setting global variables", () => {
    beforeAll(() => {
        jest.spyOn(uuid, "createUUID").mockImplementation(() => fakeUUID);
    });
    it("should a pre request script with an executable setting the variables", () => {
        const globals = { num: 5, str: "string", fun: () => null, object: { prop: "prop"} };
        const globalsSetter = buildGlobalSetterEvent(globals);
        expect(globalsSetter).toEqual({
            listen: EventTypes.PRE_REQUEST,
            script: {
                exec: [
                    "num = 5;",
                    "str = \"string\";",
                    "fun = () => null;",
                    "object = {",
                    "  prop: \"prop\",",
                    "};",
                    ""],
                id: fakeUUID,
                type: "text/javascript",
            },
        });
    });
});
