// tslint:disable: no-shadowed-variable
import buildExec from "@mappers/script/exec";
import { EventTypes } from "@src/constants";
import { IExecutable } from "@src/types";
import { dummyPreRequestExec, dummyTestExec } from "@tests/mocks/input_request";
import { validPostmanDummyPreRequestExec, validPostmanDummyTestExec } from "@tests/mocks/postman_request";

describe("Mapper for Event executables", () => {
    it("should return array of lines from the TEST script", () => {
        expect(buildExec({ type: EventTypes.TEST, exec: dummyTestExec }))
            .toEqual(validPostmanDummyTestExec);
    });

    it("should return array of lines from the PRE REQUEST script", () => {
        expect(buildExec({ type: EventTypes.PRE_REQUEST, exec: dummyPreRequestExec }))
            .toEqual(validPostmanDummyPreRequestExec);
    });

    it("should return script with global context", () => {
        const myGlobalFun = jest.fn();
        const pm = {};
        const exec: IExecutable<{ myGlobalFun: any }> = ({ myGlobalFun }) => myGlobalFun("Called param");

        const builtExec = buildExec({ type: EventTypes.PRE_REQUEST, exec, globals: { myGlobalFun } })
            .join("\n");
        // tslint:disable-next-line
        eval(builtExec);
        expect(myGlobalFun).toBeCalledWith("Called param");
    });
});
