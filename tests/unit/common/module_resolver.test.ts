import { getModulesFromPattern } from "@src/common/module_resolver";
import "@tests/mocks/esm";

let resolvePathMock = `@tests/fixtures/modules/`;

jest.mock("path", () => ({
    resolve: jest.fn((str) => resolvePathMock + str),
}));

jest.mock("fast-glob", () => ({
    sync: jest.fn(() => ["esModule.ts", "module.js"]),
}));

describe("Module Mapper", () => {
    it("should get both commonjs and es modules", () => {
        const modules = getModulesFromPattern(["**/fixtures/modules/*"]);
        expect(modules[0]).toEqual({ name: "Exemple of esModule" });
        expect(modules[1]).toEqual({ name: "Exemple of commonjs module" });
    });

    it("should throw error when module is not found", () => {
        resolvePathMock = "invalid_path/";
        expect(() => getModulesFromPattern(["**/fixtures/modules/*"]))
            .toThrowError('Cannot find module at "invalid_path/esModule.ts"');
    });
});
