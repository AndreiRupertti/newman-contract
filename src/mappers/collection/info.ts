import { isNonEmptyString, validator } from "@src/common/validator";
import { IValidateObject } from "@types";
interface IConfig {
    name?: string;
}

export const DEFAULT_SCHEMA = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";

const validateObject: IValidateObject = {
    name: {
        validate: [isNonEmptyString],
        error: "Collection name must be a non empty string",
    },
};

export default ({ name = "Contract Collection" }: IConfig) => {
    const throwUnlessValid = validator(validateObject);
    throwUnlessValid({ name });
    return {
        name,
        schema: DEFAULT_SCHEMA,
    };
};
