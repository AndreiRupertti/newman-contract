import { createUUID } from "@common/uuid";
import buildTest from "@mappers/script/test_exec";
import { EventTypes } from "@src/constants";
import { IExecutable } from "@types";

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
