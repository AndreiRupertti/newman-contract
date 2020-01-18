import BaseCollection from '@core/base_collection'
import { BrokenContractError } from '@core/contract/utils'
import ContractCollection from '@core/contract/collection'

const mockSetGlobals = jest.fn();
jest.mock('@core/base_collection', () => ({
    BrokenContractError: jest.fn()
}));

jest.mock('@core/base_collection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        setGlobals: mockSetGlobals
    }))
}));

describe('Contract Collection', () => {
    beforeEach(jest.clearAllMocks)

    describe('When creating a new contract collection', () => {
        it('should init info object', () => {
            ContractCollection({ name: 'Contract collection'})
            expect(BaseCollection).toBeCalledWith({ name: 'Contract collection'})
        });

        it('should set contract utils as global variable of collection', () => {
            ContractCollection({ name: 'Contract collection'})
            expect(mockSetGlobals).toBeCalledWith({
                contractUtils: {
                    BrokenContractError 
                }
            })
        });

        it('should return an instace of base collection', () => {
            const contractCollection = ContractCollection({ name: 'Contract collection'})
            expect(contractCollection).toMatchObject(BaseCollection({ name: 'Contract collection'}))
        });
    })
})
