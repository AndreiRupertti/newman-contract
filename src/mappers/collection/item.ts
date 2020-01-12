import buildRequest from "@mappers/request/request";
import buildEvent from "@mappers/script/event";
import { EventTypes } from "@src/constants";
import { IPostmanRequestItem, IRequestDefinition } from "@types";

export default ({ name, endpoint, method, test, query, header, body }: IRequestDefinition): IPostmanRequestItem => {
    return {
        name,
        event: [buildEvent(EventTypes.TEST, test)],
        request: buildRequest({ endpoint, method, query, header, body }),
        response: [],
    };
};
