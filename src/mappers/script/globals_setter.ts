import beautify from "@common/beautify";
import { createUUID } from "@common/uuid";
import { EventTypes } from "@src/constants";
import { IEvent } from "@types";

const getValueAttribution = (value: any): string => {
    if (typeof value === "string") { return `"${value}"`; }
    if (typeof value === "object") {
        return `{
                ${Object
                    .entries(value)
                    .reduce((str, [k, v]) => str + `${k}: ` + getValueAttribution(v) + ",", "")}
        }`;
}
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

    return beautify(template).split(LINE_BREAK_REGEX);
};
export default <T> (globals: T): IEvent => ({
    listen: EventTypes.PRE_REQUEST,
    script: {
        exec: buildGlobalsTemplate(globals),
        id: createUUID(),
        type: "text/javascript",
    },
});
