import getHeader from "@mappers/request/header";
import { getPostmanURL } from "@mappers/request/url";
import buildEvent, { EventTypes } from "@mappers/script/event";
import { IPostmanRequestItem, IRequestDefinition } from "@types";

export default ({ name, endpoint, method, test, query, header }: IRequestDefinition): IPostmanRequestItem => {
    const url = new URL(endpoint);
    return {
        name,
        event: [buildEvent(EventTypes.TEST, test)],
        request: {
            method,
            header: getHeader(header),
            url: getPostmanURL(url, query),
        },
        response: [],
    };
};
