import { EventTypes } from "@src/constants";
import { expect as ChaiExpect } from "chai";
import { test as MochaTest } from "mocha";
import * as PostmanTypes from "postman-collection";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface ISimpleObject {
    [key: string]: string | number | boolean | ISimpleObject[] | null;
}

export type IParam = ISimpleObject & { type?: string; };
export type IHeader = ISimpleObject;
export type IQuery = ISimpleObject;
export type IBody = ISimpleObject;

export type IExecutable = (params: IExecParams) => void;
export type ITestExec = IExecutable;

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
    header?: IHeader;
    query?: IQuery;
    body?: IBody;
    test: ITestExec;
}

export interface IExecParams {
    pm: IGlobalPostman;
}

export type PostmanCollection = PostmanTypes.Collection;
export type PostmanURL = Overwrite<PostmanTypes.UrlDefinition, { query?: ISimpleObject[] }>;
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
