import { createUUID } from "@src/common/uuid";

const UUID_V4_REGEX = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

describe('Create UUID', () => {
    it('should create UUID v4 matching the format', () => {
        const uuid = createUUID();
        expect(UUID_V4_REGEX.test(uuid)).toBeTruthy();
    });
})
