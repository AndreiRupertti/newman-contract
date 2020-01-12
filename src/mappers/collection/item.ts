import buildHeader from "@mappers/request/header";
import buildUrl from "@mappers/request/url";
import buildEvent from "@mappers/script/event";
import { EventTypes } from "@src/constants";
import { IPostmanRequestItem, IRequestDefinition } from "@types";

export default ({ name, endpoint, method, test, query, header }: IRequestDefinition): IPostmanRequestItem => {
    const url = new URL(endpoint);
    return {
        name,
        event: [buildEvent(EventTypes.TEST, test)],
        request: {
            method,
            header: buildHeader(header),
            url: buildUrl(url, query),
        },
        response: [],
    };
};
