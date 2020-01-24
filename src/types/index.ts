import { BrokenContractError } from "@core/contract_globals";
import { EventTypes } from "@src/constants";
import { expect as ChaiExpect } from "chai";
import { JSONSchema6, JSONSchema7  } from "json-schema";
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

export type IExecutable<T = {}> = (params: IExecParams<T>) => void;
export type ITestExec<T = {}> = IExecutable<T>;
export type ICallback<T> = (err: any, res: T) => void;

export type IVariablesMangerPM = Pick<PostmanTypes.VariableScope, "has" | "get" | "toObject" | "set">;

export interface IGlobalPostman {
    test: typeof MochaTest;
    expect: typeof ChaiExpect;
    info: IScriptInfoPM;
    variables: IVariablesMangerPM;
    environment: PostmanTypes.VariableScope;
    collectionVariables: PostmanTypes.VariableScope;
    iterationData: PostmanTypes.VariableScope;
    globals: PostmanTypes.VariableScope;
    request: PostmanTypes.Request;
    response: any;
    cookies: any;
    setGlobalVariable: (key: string, value: any) => void;
    sendRequest(endpoint: string, callback: ICallback<any>): void;
}

export interface IScriptInfoPM {
    eventName: string;
    iteration: number;
    terationCount: number;
    requestName: string;
    requestId: string;
}

export interface IResponsePM {
    headers: PostmanTypes.HeaderList;
    responseTime: number;
    code: number;
    json(): any;
    text(): string;
    reason(): string;
}

export type IExecParams<T = {}> = T & {
    pm: IGlobalPostman,
};

export interface IInfo {
    name: string;
    schema: string;
}

export interface IRequestDefinition<T = {}> {
    method: string;
    name: string;
    endpoint: string;
    header?: IHeader;
    query?: IQuery;
    body?: IBody;
    test?: IExecutable<T>;
    preRequest?: IExecutable<T>;
}

export type IContractSchema = JSONSchema6 | JSONSchema7;

export interface IContractDefinition {
    method: string;
    name: string;
    endpoint: string;
    header?: IHeader;
    query?: IQuery;
    body?: IBody;
    schema: IContractSchema;
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

export type IContractGlobals<T = {}> = T & {
    contractUtils: {
        BrokenContractError: typeof BrokenContractError,
    },
};

export interface IContractCollectionOptions {
    name?: string;
    fromPattern: string | string[];
    exportToPath?: string;
}
