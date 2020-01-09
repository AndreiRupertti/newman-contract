import buildQuery from "@mappers/request/query";
import { IQuery } from "@src/types";
import { UrlDefinition as PostmanURl } from "postman-collection";

const mapSearchParamsToQuery = (searchParams: URLSearchParams) => {
    const params = Array.from(searchParams.entries());
    return params
        .map(([key, value]) => ({ key, value }));
};

const getHost = (host: string) => host ? host.split(".") : undefined;
const getPath = (pathname: string) => pathname ? pathname.split("/").slice(1) : "";
const getProtocol = (protocol: string) => protocol ? protocol.replace(":", "") : undefined;

export const getPostmanURL = ({ protocol, host, pathname, searchParams }: URL, query?: IQuery): PostmanURl => ({
    host: getHost(host),
    path: getPath(pathname),
    query: query ? buildQuery(query) : mapSearchParamsToQuery(searchParams),
    protocol: getProtocol(protocol),
});
