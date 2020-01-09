import getHeader from '@mappers/request/header'

describe('Mapper for Collection info', () => {
    it('should return an array of header objects', () => {
        const headers = { 'string_header': 'header value', number_header: 2000 }
        expect(getHeader(headers)).toEqual([
            {
                'key': 'string_header',
                'value': 'header value',
                'type': "text",
            },
            {
                'key': 'number_header',
                'value': 2000,
                'type': "text",
            }
        ]);
    })
})