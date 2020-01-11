import buildTest from '@mappers/script/test_exec'
import { dummyTestExec } from '@tests/mocks/input_request';
import { validPostmanDummyExec } from '@tests/mocks/postman_request';

describe('Mapper for Collection info', () => {
    it('should return an array of header objects', () => {
        expect(buildTest(dummyTestExec)).toEqual(validPostmanDummyExec);
    })
})