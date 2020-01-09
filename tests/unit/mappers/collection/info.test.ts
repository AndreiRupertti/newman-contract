import getInfo, { DEFAULT_SCHEMA } from '@mappers/collection/info'

describe('Mapper for Collection info', () => {
    it('should return info', () => {
        expect(getInfo({ name: 'My Collection Name'})).toEqual({
            name: 'My Collection Name',
            schema: DEFAULT_SCHEMA
        });
    })
})