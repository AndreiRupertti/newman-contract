import buildItem from "@mappers/collection/item";
import { IRequestDefinition } from "@types";

export default (folderName: string, requests: IRequestDefinition[]) => ({
    name: folderName,
    item: requests.map(buildItem),
});
