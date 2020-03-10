import { IValidateObject } from "@types";

export const isBoolean = (value: any) =>  typeof value === "boolean";
export const isUndefined = (value: any) =>  typeof value === "undefined";
export const isString = (value: any) =>  typeof value === "string";
export const isObject = (value: any) =>  typeof value === "object";
export const isFunction = (value: any) =>  typeof value === "function";
export const isNonEmptyString = (value: any) => isString(value) && !!value.length;
export const isValidGlob = (value: any) => {
    return isNonEmptyString(value) || Array.isArray(value) && value.every(isNonEmptyString);
};
export const isValidURL = (value: any) => {
    try {
        const url = new URL(value);
        return !!url;
    } catch (_) {
        return false;
    }
};
export const isMapObject = (value: any) => {
    return isObject(value) &&
    Object.entries(value)
      .every(([key, mapValue]) =>  {
        const isComplexStructure = mapValue !== null && isObject(mapValue) || isFunction(mapValue);
        return  isNonEmptyString(key) && !isComplexStructure;
      });
};

export const validator = (validateObject: IValidateObject) => {
    return (params: any) => {
        for (const field of Object.keys(params)) {
            const value =  params[field];
            if (validateObject[field] && !isUndefined(value)) {
                const { validate, error } = validateObject[field];
                if (validate.some((check) => isFunction(check) && !check(value))) {
                    throw new Error(error);
                }
            }

        }
        return true;
    };
};
