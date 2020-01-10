import { IRequestDefinition, PostmanRequestItem } from "@types";
import getHeader from "@mappers/request/header";
import { getPostmanURL } from "@mappers/request/url";
import buildEvent, { EventTypes } from "@mappers/script/event";

export default ({ name, endpoint, method, test, query, header }: IRequestDefinition): PostmanRequestItem => {
    const url = new URL(endpoint);
    return {
        name,
        event: [buildEvent(EventTypes.TEST, test)],
        request: {
            method,
            header: getHeader(header),
            url: getPostmanURL(url, query),
        },
        response: []
    };
};
