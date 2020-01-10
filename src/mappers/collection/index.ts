import { PostmanRequestItem, IFolder, IRequestDefinition, IInfo} from "@src/types";
import buildInfo from "./info";
import buildFolder from "../folder/folder";
import buildItem from "./item";
import newman from "newman";
import { Collection as PostmanCollection } from "postman-collection";

interface ICollection {
    readonly _info: IInfo | {},
    readonly _item: Array<PostmanRequestItem | IFolder>,

    _getJsonCollection (): PostmanCollection

    addFolder(folderName: string, requests: IRequestDefinition[]): ICollection
    addRequest(request: IRequestDefinition): ICollection
    addRequests(request: IRequestDefinition[]): ICollection
    run(options?: any): void
}

interface ICollectionOptions {
    name: string
}

const Collection = ({ name }: ICollectionOptions): ICollection => ({
    _info: buildInfo({ name }),
    _item: [],

    addFolder(folderName, requests) {
        this._item.push(buildFolder(folderName, requests));
        return this;
    },

    addRequest(request) {
        this._item.push(buildItem(request))
        return this;
    },

    addRequests(request) {
        this._item.push(...request.map(buildItem));
        return this;
    },

    _getJsonCollection() {
        const collection = { info: this._info, item: this._item }
        return JSON.parse(JSON.stringify(collection));
    },

    run() {
        return newman.run({
            collection: this._getJsonCollection(),
            reporters: ["cli"]
        });
    }
});

export default Collection;