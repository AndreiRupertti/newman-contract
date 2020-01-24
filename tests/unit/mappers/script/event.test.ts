// tslint:disable no-eval
import * as uuid from "@common/uuid";
import { EventTypes } from "@src/constants/index";
import { buildEvent, buildExec } from "@src/mappers";
import { dummyPreRequestExec, dummyTestExec } from "@tests/mocks/input_request";
import mochaMock from "@tests/mocks/mocha";
import { validPostmanDummyPreRequestExec, validPostmanDummyTestExec } from "@tests/mocks/postman_request";

jest.mock("@mappers/script/exec", () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanDummyTestExec),
}));

const fakeUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

describe("Mapper to build Event", () => {
    beforeAll(() => {
        jest.spyOn(uuid, "createUUID").mockImplementation(() => fakeUUID);
    });
    beforeEach(jest.clearAllMocks);

    it("should build event object correctly", () => {
        const event = buildEvent({ type: EventTypes.TEST, exec: dummyTestExec });
        expect(event.listen).toEqual(EventTypes.TEST);
        expect(event.script).toHaveProperty("exec", expect.any(Array));
        expect(event.script).toHaveProperty("id", fakeUUID);
        expect(event.script).toHaveProperty("type", "text/javascript");
    });

    it("should build postman test script correctly", () => {
        const { script } = buildEvent({ type: EventTypes.TEST, exec: dummyTestExec });
        const pm = { ...mochaMock() };
        eval(script.exec.join("\n"));

        expect(buildExec).toBeCalledWith({ type: EventTypes.TEST, exec: dummyTestExec });
        expect(pm.test).toBeCalledWith("My dummy test", expect.any(Function));
        expect(pm.expect).toBeCalledWith(1);
        expect(pm._mock.to.be.eq).toBeCalledWith(1);
    });

    it("should build postman test script correctly", () => {
        (buildExec as jest.Mock).mockReturnValueOnce(validPostmanDummyPreRequestExec);
        const { script } = buildEvent({ type: EventTypes.PRE_REQUEST, exec: dummyPreRequestExec });
        const pm = { ...mochaMock(), setGlobalVariable: jest.fn() };
        eval(script.exec.join("\n"));

        expect(buildExec).toBeCalledWith({ type: EventTypes.PRE_REQUEST, exec: dummyPreRequestExec });
        expect(pm.setGlobalVariable).toBeCalled();
    });

    describe("With invalid type", () => {
        it("should build event with test as default type", () => {
            const { script } = buildEvent({ type: undefined as any, exec: dummyTestExec });
            const pm = { ...mochaMock() };
            eval(script.exec.join("\n"));

            expect(pm.test).toBeCalledWith("My dummy test", expect.any(Function));
            expect(pm.expect).toBeCalledWith(1);
            expect(pm._mock.to.be.eq).toBeCalledWith(1);
        });
    });

});
