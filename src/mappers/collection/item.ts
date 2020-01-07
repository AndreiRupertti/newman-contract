import { UrlDefinition as PostmanURl } from "postman-collection";

type Route = {
    name: string
    endpoint: string,
    method: string,
    test: ({ pm }: any) => void
}

const getPostmanURL = ({ protocol, host, pathname }: URL): PostmanURl => ({
    protocol: protocol ? protocol.replace(':', '') : undefined,
    host: host ? host.split('.') : undefined,
    path: pathname ? pathname.split('/').slice(1) : ''
})

const getTestEvent = (test: Function) => {
    const testLines = test.toString().split("\n")
    const executable =  [
        "// Generated Test\n",
        "const testPipeline = "+ testLines.shift(),
        ...testLines,
        "",
        "",
        "testPipeline({ pm });"
    ]

    return {
        listen: "test",
        script: {
            id: "e7dc2878-cf96-4aec-bbcc-7504301f8a47",
            exec: executable,
            type: "text/javascript"
        }
    }
}

export default ({ name, endpoint, method, test }: Route) => {
    const url = new URL(endpoint);
    return {
        name: name,
        event: [getTestEvent(test)],
        request: {
            method,
            header: [],
            url: getPostmanURL(url)
        }
    }
}