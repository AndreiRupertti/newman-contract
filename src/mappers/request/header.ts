import { IHeader, IParam} from "@types";

export default (headers: IHeader): IParam[] => {
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
