import { ITestExec } from "@types";

const LINE_BREAK_REGEX = /[\r\n]+/gm;

const buildTestTemplate = ({ lines }: { lines: string[]}) =>
`// Generated Test\n
const testPipeline = ${lines.shift()}\n
    ${lines.join("\n")}

testPipeline({ pm });
`;

export default (exec: ITestExec) => {
    const lines = exec.toString().split(LINE_BREAK_REGEX);
    const testTemplate = buildTestTemplate({ lines });
    const executable =  testTemplate.split(LINE_BREAK_REGEX);

    return executable;
};
