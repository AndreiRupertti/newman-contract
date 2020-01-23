import { EventTypes } from "@src/constants";
import { BrokenContractError } from "@src/core/contract/contract_globals";
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

export type IExecutable<T = {}> = (params: IExecParams<T>) => void;
export type ITestExec<T = {}> = IExecutable<T>;

export interface IGlobalPostman {
    test: typeof MochaTest;
    expect: typeof ChaiExpect;
    variables: PostmanTypes.VariableScope;
    request: any;
    response: { json: () => any };
    setGlobalVariable: (key: string, value: any) => void;
}

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
    schema?: any;
}

export type IExecParams<T = {}> = T & {
    pm: IGlobalPostman,
};

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

export interface ICollection<T = {}> {
    readonly _info: IInfo | {};
    _item: Array<IPostmanRequestItem | IFolder>;
    _globals: T | null;
    _globals_setter_event: IEvent[];

    setGlobals(globals: T): ICollection<T>;
    addFolder(folderName: string, requests: Array<IRequestDefinition<T>>): ICollection<T>;
    addRequest(request: IRequestDefinition<T>): ICollection<T>;
    addRequests(request: Array<IRequestDefinition<T>>): ICollection<T>;
    toJSON(): any;
}

export type IContractGlobals<T = {}> = T & {
    contractUtils: {
        BrokenContractError: typeof BrokenContractError,
    },
};

export interface ICollectionOptions {
    name: string;
}

export interface IContractCollectionOptions extends Partial<ICollectionOptions> {
    fromPattern: string | string[];
}
