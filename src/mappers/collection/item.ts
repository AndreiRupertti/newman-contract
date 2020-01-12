import buildRequest from "@mappers/request/request";
import buildEvent from "@mappers/script/event";
import { EventTypes } from "@src/constants";
import { IPostmanRequestItem, IRequestDefinition } from "@types";

type IItemBuilder = <T>(route: IRequestDefinition<T>, globals?: T) => IPostmanRequestItem;

const buildItem: IItemBuilder = ({ name, endpoint, method, test, query, header, body }, globals) => {
  return {
    name,
    event: [buildEvent({ type: EventTypes.TEST, exec: test, globals })],
    request: buildRequest({ endpoint, method, query, header, body }),
    response: [],
  };
};

export default buildItem;
