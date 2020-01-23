import { IContractGlobals } from "@src/types";

export class BrokenContractError extends Error {
    constructor(errors: any[]) {
        super();
        this.name = "Broken Contract";
        this.message = this.buildMessage(errors);
    }

    private buildMessage(errors: any[]) {
        if (!errors.length) { return ""; }
        const allErrors = errors.map((error) => `${this.getErrorMessage(error)}\n`);
        const uniqueErrors = [...new Set(allErrors)];
        return `Errors: [\n\t${uniqueErrors.join("\t")}]`;
    }

    private getErrorMessage(error: any): string {
        if (error.keyword === "additionalProperties") { return this.unkownPropertyMessage(error); }
        if (error.keyword === "type") { return  this.invalidTypeMessage(error); }
        if (error.keyword === "required") { return this.missingRequiredPropertyMessage(error); }

        return error.message;
    }

    private unkownPropertyMessage(error: any) {
        return `Unkown property: "${error.params.additionalProperty}" (not in schema)`;
    }
    private invalidTypeMessage(error: any) {
        return `Property "${error.dataPath}": ${error.message}`;
    }
    private missingRequiredPropertyMessage(error: any) {
        return `Missing required property "${error.params.missingProperty}"`;
    }
}

export default <T = {}> (): IContractGlobals<T> => ({
    contractUtils: {
        BrokenContractError,
    },
} as any);
