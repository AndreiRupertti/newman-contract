import beautify from "@src/common/beautify";
import { EventTypes, ExecFunctionName } from "@src/constants";
import { IExecutable } from "@types";

interface IExecParams<T> {
    type: EventTypes;
    exec: IExecutable<T>;
    globals?: any;
}
interface IExecBuilder {
    type: EventTypes;
    lines: string[];
    globals?: any;
}

const LINE_BREAK_REGEX = /[\r\n]+/gm;

const getGlobalContext = (globals: any) => {
    if (!globals || typeof globals !== "object") { return "{ pm }"; }
    const globalKeys = Object.keys(globals).join(", ");
    return `{ pm, ${globalKeys} }`;
};

const buildExecTemplate = ({ type, lines, globals }: IExecBuilder) =>
`// Generated code for: ${type} \n
const ${ExecFunctionName[type]} = ${lines.shift()}\n
    ${lines.join("\n")}

${ExecFunctionName[type]}(${getGlobalContext(globals)});
`;

export default <T> ({ type, exec, globals }: IExecParams<T>) => {
    const lines = exec.toString().split(LINE_BREAK_REGEX);
    const testTemplate = beautify(buildExecTemplate({ type, lines, globals }));
    const executable =  testTemplate.split(LINE_BREAK_REGEX);

    return executable;
};
