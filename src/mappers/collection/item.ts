import getHeader from "@mappers/request/header";
import { getPostmanURL } from "@mappers/request/url";
import buildEvent, { EventTypes } from "@mappers/script/event";

interface IRoute {
    method: string;
    name: string;
    endpoint: string;
    header?: any;
    query?: any;
    test: ({ pm }: any) => void;
}

export default ({ name, endpoint, method, test, query, header }: IRoute) => {
    const url = new URL(endpoint);
    return {
        event: [buildEvent(EventTypes.TEST, test)],
        name,
        request: {
            method,
            header: getHeader(header),
            url: getPostmanURL(url, query),
        },
    };
};
