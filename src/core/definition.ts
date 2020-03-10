// tslint:disable: no-unused-expression
import { isMapObject, isNonEmptyString, isValidURL, validator } from "@src/common/validator";
import {
    ContractDefinitionBuilder, IContractGlobals, IContractSchema, IExecutable, IValidateObject,
} from "@src/types";

const buildContractPreRequest = (schema: IContractSchema): IExecutable => {
    const template = ` ({ pm }) => {
        const { variables } = pm;
        const schemaUnderTest = ${JSON.stringify(schema, null, 2)}

        variables.set('schemaUnderTest', JSON.stringify(schemaUnderTest));
    }
    `;
    // tslint:disable-next-line
    return eval(`${template}`);
};

const buildContractMatcherTest = (): IExecutable<IContractGlobals> => ({ pm, contractUtils }) => {
    const { test, expect, request, variables } = pm;
    const AJV = require("ajv");
    const { BrokenContractError } = contractUtils;
    const schemaUnderTest = JSON.parse(variables.get("schemaUnderTest"));

    test(`[${request.url.getPath()}] Should match contract`, () => {
        const bodyResponse = pm.response.json();
        const ajv = new AJV({logger: console, allErrors: true, verbose: true});
        const isValid = ajv.validate(schemaUnderTest, bodyResponse);

        if (!isValid) { throw new BrokenContractError(ajv.errors); }
        expect(isValid).to.be.true;
    });
};

const validateObject: IValidateObject = {
    method: {
        validate: [isNonEmptyString],
        error: "Request method should be a valid HTTP method (eg. GET, POST, PUT, ...).",
    },
    name: {
        validate: [isNonEmptyString],
        error: "Route name should be a non empty string.",
    },
    endpoint: {
        validate: [isNonEmptyString, isValidURL],
        error: '"endpoint" should be a valid url (eg. "https://my-endpoint.com/path").',
    },
    header: {
        validate: [isMapObject],
        error: '"headers" should be an simple map object (eg. "{ [key: string]: string | number | boolean }"',
    },
    query: {
        validate: [isMapObject],
        error: '"query" should be an simple map object (eg. "{ [key: string]: string | number | boolean }"',
    },
    body: {
        validate: [isMapObject],
        error: '"body" should be an simple map object (eg. "{ [key: string]: string | number | boolean | null }"',
    },
};

const ContractDefinition: ContractDefinitionBuilder = (request) => {
    const throwUnlessValid = validator(validateObject);
    throwUnlessValid(request);

    return {
        ...request,
        test: buildContractMatcherTest(),
        preRequest: buildContractPreRequest(request.schema),
    };
};

export default ContractDefinition;
