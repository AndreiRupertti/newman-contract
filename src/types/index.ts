import { EventTypes } from "@src/mappers/script/event";
import { expect } from "chai";
import { UrlDefinition as PostmanURL } from "postman-collection";

export interface ISimpleObject {
    [key: string]: string;
}

export interface IParam { key: string; value: string; type?: string; }
export type IHeader = ISimpleObject;
export type IQuery = ISimpleObject;

export interface IGlobalPostman {
    test: typeof test;
    expect: typeof expect;
}

export interface IInfo {
    name: string;
    schema: string;
}

export interface IRequestDefinition {
    method: string;
    name: string;
    endpoint: string;
    header?: any;
    query?: any;
    test: ITestExec;
}

export type ITestExec = (params: IExecParams) => void;

export interface IExecParams {
    pm: IGlobalPostman;
}

export interface IPostmanRequestItem {
    name: string;
    event: IEvent[];
    request: {
        method: string;
        header?: IParam[];
        url: PostmanURL;
    };
    response: [];
}

export interface IEvent {
    listen: EventTypes;
    script: {
        exec: string[],
        id: string,
        type: string,
    };
}

export interface IFolder {
    name: string;
    item: IPostmanRequestItem[];
}
export {};
