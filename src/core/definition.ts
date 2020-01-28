// tslint:disable: no-unused-expression
import {
    ContractDefinitionBuilder, IContractGlobals, IContractSchema, IExecutable,
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

const ContractDefinition: ContractDefinitionBuilder = (request) => ({
    ...request,
    test: buildContractMatcherTest(),
    preRequest: buildContractPreRequest(request.schema),
});

export default ContractDefinition;
