import getInfo, { DEFAULT_SCHEMA } from '@mappers/collection/info'

describe('Mapper for Collection info', () => {
    it('should return info with given name and default schema', () => {
        expect(getInfo({ name: 'My Collection Name'})).toEqual({
            name: 'My Collection Name',
            schema: DEFAULT_SCHEMA
        });
    })

    it('should return info with default name and default schema', () => {
        expect(getInfo({})).toEqual({
            name: 'Contract Collection',
            schema: DEFAULT_SCHEMA
        });
    })
})