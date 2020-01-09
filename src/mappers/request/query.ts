import { IQuery} from "@types";
import { QueryParamDefinition } from "postman-collection";

export default (query: IQuery): QueryParamDefinition[] => {
    return Object
        .entries(query)
        .map(([key, value]) => ({ key, value }));
};
