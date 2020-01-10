import { IRequestDefinition } from "@src/types";
import buildItem from "../collection/item";

export default (folderName: string, requests: IRequestDefinition[]) => ({
    name: folderName,
    item: requests.map(buildItem),
});