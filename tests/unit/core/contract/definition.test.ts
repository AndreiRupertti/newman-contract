import ContractDefinition from '@core/definition';
import { validContractDefinition } from '@tests/mocks/input_request';
import mochaMock from '@tests/mocks/mocha';
import Ajv from 'ajv';

const mockAJvInstace = {
    validate: jest.fn().mockReturnValue(true),
    errors: [] as any[]
}
jest.mock('ajv', () => jest.fn(() => mockAJvInstace));

const fakeSchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    }
}
const pmMock = {
    ...mochaMock(),
    request: {
        url: { getPath: jest.fn(() => '/url-path') }
    },
    response: {
        json: jest.fn(() => ({ name: 'some awesome name' }))
    },
    variables: {
        set: jest.fn(),
        get: jest.fn(() => JSON.stringify(fakeSchema))
    }
} as any

const contractUtilsMock = {
    BrokenContractError: jest.fn()
} as any

describe('Contract definition', () => {
    describe('Creating a definition', () => {
        it('should return the definition with additional test and prerequest', () => {
            const contractDefinition = ContractDefinition(validContractDefinition)
            expect(contractDefinition).toHaveProperty('test', expect.any(Function))
            expect(contractDefinition).toHaveProperty('preRequest', expect.any(Function))
            expect(contractDefinition).toMatchObject(validContractDefinition)
        })
    })

    describe('The contract pre request', () => {
        it('should set schema as a variable', () => {
            const { preRequest } = ContractDefinition({ ...validContractDefinition, schema: fakeSchema });
            preRequest({ pm: pmMock });
            expect(pmMock.variables.set).toBeCalledWith('schemaUnderTest', JSON.stringify(fakeSchema))
        })
    })
    
    describe('The contract matcher test', () => {
        it('should get schema from variables', () => {
            const { test: contractTest } = ContractDefinition({ ...validContractDefinition, schema: fakeSchema });
            contractTest({ pm: pmMock, contractUtils:  contractUtilsMock });
            expect(pmMock.variables.get).toBeCalledWith('schemaUnderTest')
        })

        it('should put the path as test name', () => {
            const { test: contractTest } = ContractDefinition({ ...validContractDefinition, schema: fakeSchema });
            contractTest({ pm: pmMock, contractUtils:  contractUtilsMock });
            expect(pmMock.test).toBeCalledWith('[/url-path] Should match contract', expect.any(Function))
        })

        it('should validate the response with the given schema', () => {
            const { test: contractTest } = ContractDefinition({ ...validContractDefinition, schema: fakeSchema });
            contractTest({ pm: pmMock, contractUtils:  contractUtilsMock });
            expect(Ajv).toBeCalledWith({logger: console, allErrors: true, verbose: true});
            expect(mockAJvInstace.validate).toBeCalledWith(fakeSchema, { name: 'some awesome name' })
        })

        it('should throw an error when schema does not match', () => {
            mockAJvInstace.validate.mockReturnValue(false);
            mockAJvInstace.errors.push({ keyword: "type", dataPath: ".stringProp", message: "should be string" })
            const { test: contractTest } = ContractDefinition({ ...validContractDefinition, schema: fakeSchema });
            expect(() => contractTest({ pm: pmMock, contractUtils:  contractUtilsMock })).toThrow();
            expect(contractUtilsMock.BrokenContractError).toBeCalledWith(mockAJvInstace.errors)
        })
    })

})
