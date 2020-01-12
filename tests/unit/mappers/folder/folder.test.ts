import buildFolder from '@mappers/folder/folder'
import buildItem from "@mappers/collection/item";
import { validRequestGET, validRequestPOST } from '@tests/mocks/input_request';
import { validPostmanGetRequestItem } from '@tests/mocks/postman_request';

jest.mock('@mappers/collection/item', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanGetRequestItem)
}));

describe('Mapper for Collection folder', () => {
    beforeEach(jest.clearAllMocks)
    it('should return postman folder', () => {
        const requests = [validRequestGET, validRequestPOST]
        expect(buildFolder('Test Folder', requests)).toEqual({
            name: 'Test Folder',
            item: [validPostmanGetRequestItem, validPostmanGetRequestItem]
        });
    })

    it('should return postman folder with no items when there are no requests', () => {
        expect(buildFolder('Test Folder', [])).toEqual({
            name: 'Test Folder',
            item: []
        });
        expect(buildItem).not.toBeCalled();
    })
})