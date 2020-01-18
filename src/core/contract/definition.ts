import {
    IContractGlobals, IExecutable, IRequestDefinition,
} from "@src/types";

const buildContractPreRequest = (schema: any): IExecutable => {
    const template = ` ({ pm }) => {
        const { variables } = pm;
        const schemaUnderTest = ${JSON.stringify(schema)}

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
        // tslint:disable-next-line
        expect(isValid).to.be.true;
    });
};

const ContractDefinition = (request: IRequestDefinition) => ({
    ...request,
    test: buildContractMatcherTest(),
    preRequest: buildContractPreRequest(request.schema),
});

export default ContractDefinition;
