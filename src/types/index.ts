import { EventTypes } from "@src/constants";
import { expect as ChaiExpect } from "chai";
import { test as MochaTest } from "mocha";
import * as PostmanTypes from "postman-collection";

export interface ISimpleObject {
    [key: string]: string;
}

export interface IParam { key: string; value: string; type?: string; }
export type IHeader = ISimpleObject;
export type IQuery = ISimpleObject;

export interface IGlobalPostman {
    test: typeof MochaTest;
    expect: typeof ChaiExpect;
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

export type IExecutable = (params: IExecParams) => void;
export type ITestExec = IExecutable;

export interface IExecParams {
    pm: IGlobalPostman;
}

export type PostmanCollection = PostmanTypes.Collection;
export type PostmanURL = PostmanTypes.UrlDefinition;

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
