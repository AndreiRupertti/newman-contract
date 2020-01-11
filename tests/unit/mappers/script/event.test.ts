import { EventTypes } from '@src/constants/index'
import { buildEvent } from '@src/mappers/index'
import mochaMock from '@tests/mocks/mocha';
import { dummyTestExec } from '@tests/mocks/input_request';
import { validPostmanDummyExec } from '@tests/mocks/postman_request';
import * as uuid from '@common/uuid'

jest.mock("@mappers/script/test_exec", () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanDummyExec)
}))

const fakeUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

describe('Mapper to build Event', () => {
    beforeAll(() => {
        jest.spyOn(uuid, 'createUUID').mockImplementation(() => fakeUUID)
    })
    beforeEach(jest.clearAllMocks)

    it('should build event object correctly', () => {
        const event = buildEvent(EventTypes.TEST, dummyTestExec);
        expect(event.listen).toEqual(EventTypes.TEST);
        expect(event.script).toHaveProperty('exec', expect.any(Array));
        expect(event.script).toHaveProperty('id', fakeUUID);
        expect(event.script).toHaveProperty('type', 'text/javascript');
    })

    it('should build postman test script correctly', () => {
        const { script } = buildEvent(EventTypes.TEST, dummyTestExec)
        const pm = { ...mochaMock() }
        eval(script.exec.join('\n'));

        expect(pm.test).toBeCalledWith('My dummy test', expect.any(Function))
        expect(pm.expect).toBeCalledWith(1)
        expect(pm._mock.to.be.eq).toBeCalledWith(1)
    })
    
    describe('With invalid type', () => {
        it('should build event with test as default type', () => {
            const { script } = buildEvent(null as any, dummyTestExec)
            const pm = { ...mochaMock() }
            eval(script.exec.join('\n'));
    
            expect(pm.test).toBeCalledWith('My dummy test', expect.any(Function))
            expect(pm.expect).toBeCalledWith(1)
            expect(pm._mock.to.be.eq).toBeCalledWith(1)
        })
    })
    
})