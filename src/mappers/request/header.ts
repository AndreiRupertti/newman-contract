import { IHeader} from "@types";
import { HeaderDefinition } from "postman-collection";

export default (headers: IHeader): HeaderDefinition[] => {
    return Object
        .entries(headers)
        .map(([key, value]) => (
            {
                key,
                value,
                type: "text",
            }
        ));
};
