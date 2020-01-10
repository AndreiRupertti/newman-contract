import { EventTypes } from "@src/mappers/script/event";
import { UrlDefinition as PostmanURL } from "postman-collection";
import { expect } from 'chai'

export interface ISimpleObject {
    [key: string]: string;
}

export type IParam = { key: string, value: string, type?: string }
export type IHeader = ISimpleObject;
export type IQuery = ISimpleObject;

export interface GlobalPostman {
    test: typeof test,
    expect: typeof expect
}

export interface IInfo {
    name: string,
    schema: string
}

export interface IRequestDefinition {
    method: string;
    name: string;
    endpoint: string;
    header?: any;
    query?: any;
    test: ITestExec
}

export type ITestExec = (params: IExecParams) => void

export interface IExecParams {
    pm: GlobalPostman
}

export interface PostmanRequestItem {
    name: string;
    event: Array<IEvent>;
    request: {
        method: string;
        header?: IParam[];
        url: PostmanURL;
    };
    response: []
}

export interface IEvent {
    listen: EventTypes,
    script: {
        exec: string[],
        id: string,
        type: string,
    },
}

export interface IFolder {
    name: string;
    item: Array<PostmanRequestItem>;
}
export {};
