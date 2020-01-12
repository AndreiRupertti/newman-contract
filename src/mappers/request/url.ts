import buildQuery from "@mappers/request/query";
import { IQuery } from "@types";

const mapSearchParamsToQuery = (searchParams: URLSearchParams) => {
    const queryEntries = Array.from(searchParams.entries());
    return buildQuery(queryEntries);
};

const getUrlObjectFromEndpoint = (endpoint: string) => {
    try { return new URL(endpoint); } catch (err) { throw new Error("Invalid endpoint"); }
};

const getHost = (host: string) => host.split(".");
const getPath = (pathname: string) => pathname.split("/").slice(1);
const getProtocol = (protocol: string) => protocol.replace(":", "");

interface IUrlOptions {
    query: IQuery;
}

export default (endpoint: string, options: Partial<IUrlOptions> = {}) => {
    const { host, pathname, protocol, searchParams } = getUrlObjectFromEndpoint(endpoint);
    return {
        host: getHost(host),
        path: getPath(pathname),
        query: options.query ? buildQuery(options.query) : mapSearchParamsToQuery(searchParams),
        protocol: getProtocol(protocol),
    };
};
