import { createUUID } from "@common/uuid";
import { EventTypes } from "@src/constants";
import { IEvent } from "@src/types";

const getValueAttribution = (value: any) => {
    if (typeof value === "string") { return `"${value}"`; }
    return String(value);
};
const LINE_BREAK_REGEX = /[\r\n]+/gm;
const buildGlobalsTemplate = <T> (globals: T) => {
    const template = Object.entries(globals)
        .reduce((varDefinition, [key, value]) => {
            return varDefinition.concat(
                `${key} = ${getValueAttribution(value)};\n`,
            );
        }, "");

    return template.split(LINE_BREAK_REGEX);
};
export default <T> (globals: T): IEvent => ({
    listen: EventTypes.PRE_REQUEST,
    script: {
        exec: buildGlobalsTemplate(globals),
        id: createUUID(),
        type: "text/javascript",
    },
});
