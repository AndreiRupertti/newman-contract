import buildItem from "@mappers/collection/item";
import { IRequestDefinition } from "@types";

interface IFolderParams<T> { folderName: string; requests: Array<IRequestDefinition<T>>; globals?: T; }
export default <T> ({ folderName, requests, globals}: IFolderParams<T>) => ({
    name: folderName,
    item: requests.map((request) => buildItem(request, globals)),
});
