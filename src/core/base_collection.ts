import {
    buildFolder,
    buildGlobalSetterEvent,
    buildInfo,
    buildItem,
} from "@src/mappers";
import {
    IEvent,
    IFolder,
    IInfo,
    IPostmanRequestItem,
    IRequestDefinition,
} from "@src/types";
import newman from "newman";

interface ICollection<T> {
    readonly _info: IInfo | {};
    _item: Array<IPostmanRequestItem | IFolder>;
    _globals: T | null;
    _globals_setter_event: IEvent[];

    setGlobals(globals: T): ICollection<T>;
    addFolder(folderName: string, requests: Array<IRequestDefinition<T>>): ICollection<T>;
    addRequest(request: IRequestDefinition<T>): ICollection<T>;
    addRequests(request: Array<IRequestDefinition<T>>): ICollection<T>;
    toJSON(): any;
    run(options?: any): void;
}

interface ICollectionOptions {
    name: string;
}

const Collection = <T = {}>({ name }: ICollectionOptions): ICollection<T> => ({
    _info: buildInfo({ name }),
    _item: [] as  Array<IPostmanRequestItem | IFolder>,
    _globals: null,
    _globals_setter_event: [],

    setGlobals(globals) {
        if (!globals || typeof globals !== "object") { throw new Error("Invalid globals: must be an object"); }
        this._globals = globals;
        this._globals_setter_event = [buildGlobalSetterEvent(globals)];
        return this;
    },

    addFolder(folderName, requests) {
        this._item.push(buildFolder({ folderName, requests, globals: this._globals as T}));
        return this;
    },

    addRequest(request) {
        this._item.push(buildItem(request, this._globals as T));
        return this;
    },

    addRequests(requests) {
        this._item.push(...requests.map((request) => buildItem(request, this._globals as T)));
        return this;
    },

    toJSON() {
        return JSON.parse(
            JSON.stringify({
                info: this._info,
                item: this._item,
                event: this._globals_setter_event,
            }),
        );
    },

    run() {
        return newman.run({
            collection: this.toJSON(),
            reporters: ["cli"],
        });
    },
});

export default Collection;
