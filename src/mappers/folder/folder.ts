import { IRequestDefinition } from "@types";
import buildItem from "@mappers/collection/item";

export default (folderName: string, requests: IRequestDefinition[]) => ({
    name: folderName,
    item: requests.map(buildItem),
});
