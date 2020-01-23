import contractGlobals from '@src/core/contract/contract_globals'
import ContractCollection from '@core/contract/collection'
import { buildInfo, buildGlobalSetterEvent, buildItem } from '@src/mappers';
import { validPostmanRequestItemGET, validPostmanDummyPreRequestEvent } from '@tests/mocks/postman_request';


jest.mock('@src/core/contract/contract_globals', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        contractUtils: {}
    }))
}));
jest.mock('@common/module_resolver', () => ({
    getModulesFromPattern: jest.fn(() => [{ name: 'module definition '}])
}))

jest.mock('@src/mappers', () => ({
    buildGlobalSetterEvent: jest.fn(() => validPostmanDummyPreRequestEvent),
    buildInfo: jest.fn(() => ({ name: 'Collection info' })),
    buildItem: jest.fn(() => (validPostmanRequestItemGET))
}));

describe('Contract Collection', () => {
    beforeEach(jest.clearAllMocks)

    describe('When creating a new contract collection', () => {
        it('should init info object', () => {
            ContractCollection({ fromPattern: '*', name: 'Contract collection'})
            expect(buildInfo).toBeCalledWith({ name: 'Contract collection'})
        });

        it('should set contract utils as global variable of collection', () => {
            ContractCollection({ fromPattern: '*', name: 'Contract collection'})
            expect(buildGlobalSetterEvent).toBeCalledWith({ contractUtils: {} })
        });

        it('should build item with global variables', () => {
            ContractCollection({ fromPattern: '*', name: 'Contract collection'})
            expect(buildItem).toBeCalledWith(
                { name: 'module definition '},
                { contractUtils: { } }
            )
        });

        it('should return an instace of base collection', () => {
            const contractCollection = ContractCollection({ fromPattern: '*', name: 'Contract collection'})
            expect(contractCollection).toEqual({
                info: { name: 'Collection info' },
                item: [validPostmanRequestItemGET],
                event: validPostmanDummyPreRequestEvent
            })
        });
    })
})
