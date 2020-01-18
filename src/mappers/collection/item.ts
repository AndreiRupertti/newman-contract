import buildRequest from "@mappers/request/request";
import buildEvent from "@mappers/script/event";
import { EventTypes } from "@src/constants";
import { IExecutable, IPostmanRequestItem, IRequestDefinition } from "@types";
// tslint:disable
type IItemBuilder = <T>(route: IRequestDefinition<T>, globals?: T) => IPostmanRequestItem;

const getEvents = <T>(test?: IExecutable<T>, preRequest?: IExecutable<T>, globals?: T) => {
  const events = [];
  if (test && typeof test === 'function') {
    events.push(buildEvent({ type: EventTypes.TEST, exec: test, globals }));
  }
  if (preRequest && typeof preRequest === 'function') {
    events.push(buildEvent({ type: EventTypes.PRE_REQUEST, exec: preRequest, globals }));
  }
  return events
}

const buildItem: IItemBuilder = ({
   name,
   endpoint,
   method,
   test,
   preRequest,
   query,
   header,
   body,
}, globals) => {
  return {
    name,
    event: getEvents(test, preRequest, globals),
    request: buildRequest({ endpoint, method, query, header, body }),
    response: [],
  };
};

export default buildItem;
