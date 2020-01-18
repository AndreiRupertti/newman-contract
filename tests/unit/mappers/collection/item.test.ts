import buildItem from '@mappers/collection/item'
import { validRequestGET, validRequestPOST } from '@tests/mocks/input_request';
import { validPostmanDummyTestEvent, validPostmanRequestGET } from '@tests/mocks/postman_request';
import { EventTypes } from '@src/constants';
import { buildRequest, buildEvent } from '@src/mappers';
import { IPostmanRequestItem } from '@src/types';

jest.mock('@mappers/script/event', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanDummyTestEvent)
}))

jest.mock('@mappers/request/request', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanRequestGET)
}))

describe('Mapper for Collection item', () => {
    beforeEach(jest.clearAllMocks)
    
    it('should return item for get request', () => {
        const expectedItem: IPostmanRequestItem = {
            name: 'Valid Get Mock',
            event: [validPostmanDummyTestEvent],
            request: validPostmanRequestGET,
            response: []
        }

        expect(buildItem(validRequestGET)).toEqual(expectedItem);
    })

    it('should call buildEvent with type test and executable', () => {
        buildItem(validRequestGET)
        expect(buildEvent).toBeCalledWith({ type: EventTypes.TEST, exec: validRequestGET.test});
    })

    it('should call buildRequest with GET request items', () => {
        buildItem(validRequestGET)
        expect(buildRequest).toBeCalledWith({
            "endpoint": validRequestGET.endpoint,
            "header": validRequestGET.header,
            "method": validRequestGET.method,
            "query": validRequestGET.query
        });
    })

    it('should call buildRequest with POST request headers', () => {
        buildItem(validRequestPOST)
        expect(buildRequest).toBeCalledWith({
            "endpoint": validRequestPOST.endpoint,
            "header": validRequestPOST.header,
            "method": validRequestPOST.method,
            "body": validRequestPOST.body,
            "query": validRequestPOST.query
        });
    })
})