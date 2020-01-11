import newman from "newman";
import {
    buildInfo,
    buildItem,
    buildFolder,
} from "@src/mappers";
import {
    IFolder,
    IInfo,
    IPostmanRequestItem,
    IRequestDefinition
} from "@src/types";

interface ICollection {
    readonly _info: IInfo | {};
    readonly _item: Array<IPostmanRequestItem | IFolder>;

    addFolder(folderName: string, requests: IRequestDefinition[]): ICollection;
    addRequest(request: IRequestDefinition): ICollection;
    addRequests(request: IRequestDefinition[]): ICollection;
    toJSON(): any;
    run(options?: any): void;
}

interface ICollectionOptions {
    name: string;
}

const Collection = ({ name }: ICollectionOptions): ICollection => ({
    _info: buildInfo({ name }),
    _item: [] as  Array<IPostmanRequestItem | IFolder>,

    addFolder(folderName, requests) {
        this._item.push(buildFolder(folderName, requests));
        return this;
    },

    addRequest(request) {
        this._item.push(buildItem(request));
        return this;
    },

    addRequests(requests) {
        this._item.push(...requests.map(request => buildItem(request)));
        return this;
    },

    toJSON() {
        return JSON.parse(
            JSON.stringify({ info: this._info, item: this._item})
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
