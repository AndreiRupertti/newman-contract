interface IRootCollection { info: any; item: any[]; }
import { Collection as PostmanCollection } from "postman-collection";

export default ({ info, item }: IRootCollection): PostmanCollection => {
    const collection = { item, info };
    return JSON.parse(JSON.stringify(collection));
};
