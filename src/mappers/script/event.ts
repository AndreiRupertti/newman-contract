import { createUUID } from "@common/uuid";
import { EventTypes } from "@src/constants";
import buildExec from "@src/mappers/script/exec";
import { IExecutable } from "@types";

interface IEventParams<T> {
    type: EventTypes;
    exec: IExecutable<T>;
    globals?: T;
}

export default <T> ({ type, exec, globals }: IEventParams<T>) => ({
    listen: type,
    script: {
        exec: buildExec({ type, exec, globals }),
        id: createUUID(),
        type: "text/javascript",
    },
});
