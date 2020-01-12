import { IQuery, ISimpleObject} from "@types";
import { QueryParamDefinition } from "postman-collection";

export default (queryEntries: IQuery | Array<[string, string]>) => {
    const entries =  Array.isArray(queryEntries) ? queryEntries : Object.entries(queryEntries);
    return entries.map(([key, value]) => ({ key, value }));
};
