import writeToFile from '@core/write_file'
import { writeFileSync as spyWriteFileSync } from "fs";

jest.mock('fs', () => ({
    writeFileSync: jest.fn()
}));
describe('Write to file', () => {
    it('should write a json string to given file', () => {
        writeToFile('./path.json', { name: 'string' })
        const [, jsonString] = (spyWriteFileSync as jest.Mock).mock.calls[0];
        expect(spyWriteFileSync).toBeCalledWith('./path.json', expect.any(String));
        expect(JSON.parse(jsonString)).toEqual({ name: 'string' });
    })

    it('should throw error with invalid json', () => {
        (spyWriteFileSync as jest.Mock).mockImplementation(function() { throw new Error() });
        expect(() => writeToFile('./path.json', { name: 'string' })).toThrowError('could not export colllection to ./path.json');
    })

})