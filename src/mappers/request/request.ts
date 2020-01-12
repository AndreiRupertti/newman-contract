import buildBody from "@mappers/request/body";
import buildHeader from "@mappers/request/header";
import buildUrl from "@mappers/request/url";
import { IBody, IHeader, IRequestDefinition } from "@types";

const getHeader = (header: IHeader | undefined) =>  header ? { header: buildHeader(header) } : undefined;

const getBody = (body: IBody | undefined) =>  body ? { body: buildBody(body) } : undefined;

type IRequestParams = Omit<IRequestDefinition, "test"|"name">;
export default ({ endpoint, method, query, header, body }: IRequestParams) => {
    return {
        method,
        ...getHeader(header),
        ...getBody(body),
        url: buildUrl(endpoint, { query }),
    };
};
