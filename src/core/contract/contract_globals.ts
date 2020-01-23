import { IContractGlobals } from "@src/types";
import { AdditionalPropertiesParams, ErrorObject, RequiredParams } from "ajv";

export class BrokenContractError extends Error {
    constructor(errors: ErrorObject[]) {
        super();
        this.name = "Broken Contract";
        this.message = this.buildMessage(errors);
    }

    private buildMessage(errors: ErrorObject[]) {
        if (!errors.length) { return ""; }
        const allErrors = errors.map((error) => `${this.getErrorMessage(error)}\n`);
        const uniqueErrors = [...new Set(allErrors)];
        return `Errors: [\n\t${uniqueErrors.join("\t")}]`;
    }

    private getErrorMessage(error: ErrorObject): string {
        if (error.keyword === "additionalProperties") { return this.unkownPropertyMessage(error); }
        if (error.keyword === "type") { return  this.invalidTypeMessage(error); }
        if (error.keyword === "required") { return this.missingRequiredPropertyMessage(error); }

        return error.message || "";
    }

    private unkownPropertyMessage(error: ErrorObject) {
        const property  = (error.params as AdditionalPropertiesParams).additionalProperty;
        return `Unkown property: "${property}" (not in schema)`;
    }
    private invalidTypeMessage(error: ErrorObject) {
        return `Property "${error.dataPath}": ${error.message}`;
    }
    private missingRequiredPropertyMessage(error: ErrorObject) {
        const property = (error.params as RequiredParams).missingProperty;
        return `Missing required property "${property}"`;
    }
}

export default <T = {}> (): IContractGlobals<T> => ({
    contractUtils: {
        BrokenContractError,
    },
} as any);
