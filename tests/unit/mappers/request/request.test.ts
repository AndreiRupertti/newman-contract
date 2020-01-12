import buildRequest from '@mappers/request/request'
import { validRequestGET, validRequestPOST } from '@tests/mocks/input_request';
import { validPostmanRequestPOST, validPostmanGetRequest } from '@tests/mocks/postman_request';
import { buildUrl, buildEvent, buildHeader } from '@src/mappers';

jest.mock('@mappers/request/body', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanRequestPOST.body)
}))

jest.mock('@mappers/request/url', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanGetRequest.url)
}))
jest.mock('@mappers/request/header', () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanGetRequest.header)
}))

describe('Mapper for Collection request', () => {
    it('should return method and url for GET request ', () => {
        const requestParams: any = { method: 'GET', endpoint: validRequestGET.endpoint }
        expect(buildRequest(requestParams)).toHaveProperty('method', 'GET');
        expect(buildRequest(requestParams)).toHaveProperty('url', validPostmanGetRequest.url);
    })

    it('should build header when header is given', () => {
        const requestParams: any = { method: 'GET', endpoint: validRequestGET.endpoint, header: validRequestGET.header }
        expect(buildRequest(requestParams)).toHaveProperty('header', validPostmanGetRequest.header);
    })

    it('should build body when body is given', () => {
        const requestParams: any = { method: 'POST', endpoint: validRequestPOST.endpoint, body: validRequestPOST.body }
        expect(buildRequest(requestParams)).toHaveProperty('body', validPostmanRequestPOST.body);
    })
})