import buildItem from "@mappers/collection/item";
import { EventTypes } from "@src/constants";
import { buildEvent, buildRequest } from "@src/mappers";
import { IPostmanRequestItem } from "@src/types";
import event from "@mappers/script/event";
import request from "@mappers/request/request";
import { validRequestGET, validRequestPOST } from "@tests/mocks/input_request";
import {
  validPostmanDummyPreRequestEvent,
  validPostmanDummyTestEvent,
  validPostmanRequestGET
} from "@tests/mocks/postman_request";

jest.mock("@mappers/script/event");
const mockedEvent = event as jest.Mock;

jest.mock("@mappers/request/request");
const mockedRequest = request as jest.Mock;

describe("Mapper for Collection item", () => {
  beforeAll(() => {
      mockedRequest.mockReturnValue(validPostmanRequestGET)
      mockedEvent.mockImplementation(eventParam =>
        eventParam.type === EventTypes.TEST
          ? validPostmanDummyTestEvent
          : validPostmanDummyPreRequestEvent
      )
  })
  beforeEach(jest.clearAllMocks);

  it("should return item for get request", () => {
    const expectedItem: IPostmanRequestItem = {
      name: "Valid Get Mock",
      event: [validPostmanDummyTestEvent, validPostmanDummyPreRequestEvent],
      request: validPostmanRequestGET,
      response: []
    };

    expect(buildItem(validRequestGET)).toEqual(expectedItem);
  });

  it("should call buildEvent with type test and executable", () => {
    buildItem(validRequestGET);
    expect(buildEvent).toBeCalledWith({
      type: EventTypes.TEST,
      exec: validRequestGET.test
    });
  });

  it("should recursively create folders based on file path", () => {
    buildItem(validRequestGET);
    expect(buildEvent).toBeCalledWith({
      type: EventTypes.TEST,
      exec: validRequestGET.test
    });
  });

  it("should call buildRequest with GET request items", () => {
    buildItem(validRequestGET);
    expect(buildRequest).toBeCalledWith({
      endpoint: validRequestGET.endpoint,
      header: validRequestGET.header,
      method: validRequestGET.method,
      query: validRequestGET.query
    });
  });

  it("should call buildRequest with POST request headers", () => {
    buildItem(validRequestPOST);
    expect(buildRequest).toBeCalledWith({
      endpoint: validRequestPOST.endpoint,
      header: validRequestPOST.header,
      method: validRequestPOST.method,
      body: validRequestPOST.body,
      query: validRequestPOST.query
    });
  });
});
