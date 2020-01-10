import buildInfo from "@mappers/collection/info";
import buildItem from "@mappers/collection/item";
import buildFolder from "@mappers/folder/folder";
import { IFolder, IInfo, IPostmanRequestItem, IRequestDefinition} from "@src/types";
import newman from "newman";
import getCollectionAsJson from "./collection_json";

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
    _item: [],

    addFolder(folderName, requests) {
        this._item.push(buildFolder(folderName, requests));
        return this;
    },

    addRequest(request) {
        this._item.push(buildItem(request));
        return this;
    },

    addRequests(request) {
        this._item.push(...request.map(buildItem));
        return this;
    },

    toJSON() {
        return getCollectionAsJson({ info: this._info, item: this._item}) as any;
    },

    run() {
        return newman.run({
            collection: this.toJSON(),
            reporters: ["cli"],
        });
    },
});

export default Collection;
