import buildEvent, { EventTypes, IExecutable } from '@mappers/script/event'
import mochaMock from '@tests/mocks/mocha';

const testExecFake: IExecutable = ({ pm }) => {
    const { test, expect } = pm;

    test('Dummy test', () => {
        expect(1).to.be.eq(1);
    })
}


describe('Mapper to build Event', () => {
    it('should build event object correctly', () => {
        const event = buildEvent(EventTypes.TEST, testExecFake);
        expect(event.listen).toEqual(EventTypes.TEST);
        expect(event.script).toHaveProperty('exec', expect.any(Array));
        expect(event.script).toHaveProperty('id', expect.any(String));
        expect(event.script).toHaveProperty('type', 'text/javascript');
    })

    it('should build postman test script correctly', () => {
        const { script } = buildEvent(EventTypes.TEST, testExecFake)
        const pm = { ...mochaMock() }
        eval(script.exec.join('\n'));

        expect(pm.test).toBeCalledWith('Dummy test', expect.any(Function))
        expect(pm.expect).toBeCalledWith(1)
        expect(pm._mock.to.be.eq).toBeCalledWith(1)
    })
    
    describe('With invalid type', () => {
        it('should build event with test as default type', () => {
            const { script } = buildEvent(null as any, testExecFake)
            const pm = { ...mochaMock() }
            eval(script.exec.join('\n'));
    
            expect(pm.test).toBeCalledWith('Dummy test', expect.any(Function))
            expect(pm.expect).toBeCalledWith(1)
            expect(pm._mock.to.be.eq).toBeCalledWith(1)
        })
    })
    
})