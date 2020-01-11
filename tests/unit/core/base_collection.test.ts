import { validRequestGET, validRequestPOST } from '@tests/mocks/input_request';
import { validPostmanGetRequestItem } from '@tests/mocks/postman_request';
import * as mappers from '@src/mappers';
import BaseCollection from '@src/core/base_collection'

jest.mock('@src/mappers', () => ({
    buildInfo: jest.fn(options => options),
    buildItem: jest.fn().mockReturnValue(validPostmanGetRequestItem),
    buildFolder: jest.fn()
}));

describe('Base Collection', () => {
    beforeEach(jest.clearAllMocks)

    describe('When creating a new base collection', () => {
        it('should init info object', () => {
            BaseCollection({ name: 'Base collection'})
            expect(mappers.buildInfo).toBeCalledWith({ name: 'Base collection'})
        });
    })

    describe('When adding a singular request', () => {
        it('should buildRequest and push to item list', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            collection.addRequest(validRequestGET)
            expect(mappers.buildItem).toBeCalledWith(validRequestGET)
            expect(collection._item).toContainEqual(validPostmanGetRequestItem)
        });
    })
    
    
    describe('When adding multiple requests', () => {
        it('should buildRequest and push to item list', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            collection.addRequests([validRequestGET, validRequestPOST])
            expect(mappers.buildItem).nthCalledWith(1, validRequestGET)
            expect(mappers.buildItem).nthCalledWith(2, validRequestPOST)
            expect(collection._item).toHaveLength(2)
        });

        it('should not add anything to collection items when requests is empty', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            collection.addRequests([])
            expect(mappers.buildItem).not.toBeCalled()
            expect(collection._item).toHaveLength(0)
        });
    })

    describe('When parsing collection to json', () => {
        beforeAll(() => {
            jest.spyOn(JSON, 'stringify')
            jest.spyOn(JSON, 'parse')
        })
        
        it('should get collection as json with right params', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            const collectionJson = collection.addRequest(validRequestGET).toJSON()
            expect(collectionJson).toBeDefined();
            expect(JSON.stringify).toBeCalledWith({
                info: { name: 'Base collection' },
                item: [validPostmanGetRequestItem]
            })
            expect(JSON.parse).toBeCalledWith(expect.any(String))
        });

        it('should drop chain', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            expect(() => collection.addRequest(validRequestGET).toJSON()).not.toThrow()
            expect(() => collection.toJSON().addRequest(validRequestGET)).toThrow()
        });
    });

    describe('When adding a folder', () => {
        it('should build folder with name and its requests', () => {
            const collection = BaseCollection({ name: 'Base collection'})
            collection.addFolder('/folder', [validRequestGET, validRequestPOST])
            expect(mappers.buildFolder).toBeCalledWith('/folder', [validRequestGET, validRequestPOST])
        });
    });
})
