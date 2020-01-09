import { createUUID } from "@src/common/uuid";
import buildTest from "./testExec";

export enum EventTypes {
    PRE_REQUEST = "pre-request",
    TEST = "test",
}

export type IExecutable = ({ pm }: any) => void;

const buildExecutableByType = (type: EventTypes, exec: IExecutable) => {
    if (type === EventTypes.TEST) { return buildTest(exec); }

    return buildTest(exec);
};

export default (type: EventTypes, exec: IExecutable) => ({
    listen: type,
    script: {
        exec: buildExecutableByType(type, exec),
        id: createUUID(),
        type: "text/javascript",
    },
});
