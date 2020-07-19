import buildRequest from "@mappers/request/request";
import body from "@mappers/request/body";
import url from "@mappers/request/url";
import header from "@mappers/request/header";
import { validRequestGET, validRequestPOST } from "@tests/mocks/input_request";
import {
  validPostmanRequestGET,
  validPostmanRequestPOST
} from "@tests/mocks/postman_request";

jest.mock("@mappers/request/body");
const mockedBody = body as jest.Mock;

jest.mock("@mappers/request/url");
const mockedUrl = url as jest.Mock;

jest.mock("@mappers/request/header");
const mockedHeader = header as jest.Mock;

describe("Mapper for Collection request", () => {
  beforeAll(() => {
    mockedBody.mockReturnValue(validPostmanRequestPOST.body);
    mockedUrl.mockReturnValue(validPostmanRequestGET.url);
    mockedHeader.mockReturnValue(validPostmanRequestGET.header);
  });

  it("should return method and url for GET request ", () => {
    const requestParams: any = {
      method: "GET",
      endpoint: validRequestGET.endpoint
    };
    expect(buildRequest(requestParams)).toHaveProperty("method", "GET");
    expect(buildRequest(requestParams)).toHaveProperty(
      "url",
      validPostmanRequestGET.url
    );
  });

  it("should build header when header is given", () => {
    const requestParams: any = {
      method: "GET",
      endpoint: validRequestGET.endpoint,
      header: validRequestGET.header
    };
    expect(buildRequest(requestParams)).toHaveProperty(
      "header",
      validPostmanRequestGET.header
    );
  });

  it("should build body when body is given", () => {
    const requestParams: any = {
      method: "POST",
      endpoint: validRequestPOST.endpoint,
      body: validRequestPOST.body
    };
    expect(buildRequest(requestParams)).toHaveProperty(
      "body",
      validPostmanRequestPOST.body
    );
  });
});
