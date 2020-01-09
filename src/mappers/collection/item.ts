import getHeader from "@mappers/request/header";
import { getPostmanURL } from "../request/url";

interface IRoute {
    method: string;
    name: string;
    endpoint: string;
    header?: any;
    query?: any;
    test: ({ pm }: any) => void;
}

const getTestEvent = (test: ({ pm }: any) => void) => {
    const testLines = test.toString().split("\n");
    const executable =  [
        "// Generated Test\n",
        "const testPipeline = " + testLines.shift(),
        ...testLines,
        "",
        "",
        "testPipeline({ pm });",
    ];

    return {
        listen: "test",
        script: {
            exec: executable,
            id: "e7dc2878-cf96-4aec-bbcc-7504301f8a47",
            type: "text/javascript",
        },
    };
};

export default ({ name, endpoint, method, test, query, header }: IRoute) => {
    const url = new URL(endpoint);
    return {
        event: [getTestEvent(test)],
        name,
        request: {
            method,
            header: getHeader(header),
            url: getPostmanURL(url, query),
        },
    };
};
