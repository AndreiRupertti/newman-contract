import buildItem from '@mappers/collection/item'
import { validRequestGET } from '@tests/mocks/input_request';
import { validPostmanDummyTestEvent, validPostmanGetRequest } from '@tests/mocks/postman_request';
import { EventTypes } from '@src/constants';
import { buildHeader, buildUrl, buildEvent } from '@src/mappers';

jest.mock('@mappers/script/event', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanDummyTestEvent)
}))

jest.mock('@mappers/request/header', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanGetRequest.header)
}))

jest.mock('@mappers/request/url', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanGetRequest.url)
}))

describe('Mapper for Collection item', () => {
    beforeEach(jest.clearAllMocks)
    
    it('should return item for get request', () => {
        expect(buildItem(validRequestGET)).toEqual({
            name: 'Valid Get Mock',
            event: [validPostmanDummyTestEvent],
            request: validPostmanGetRequest,
            response: []
        });
    })

    it('should call buildEvent with type test and executable', () => {
        buildItem(validRequestGET)
        expect(buildEvent).toBeCalledWith(EventTypes.TEST, validRequestGET.test);
    })

    it('should call buildHeader with request headers', () => {
        buildItem(validRequestGET)
        expect(buildHeader).toBeCalledWith(validRequestGET.header);
    })

    it('should call buildUrl with endpoint and options params', () => {
        buildItem(validRequestGET)
        expect(buildUrl).toBeCalledWith(
            validRequestGET.endpoint,
            { query: validRequestGET.query }
        );
    })
})