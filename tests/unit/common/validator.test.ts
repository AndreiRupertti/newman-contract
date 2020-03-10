import { isMapObject, isNonEmptyString, isValidGlob, isValidURL, validator } from "@common/validator";

describe("is Valid Glob", () => {
    it("Should return true valid glob string", () => {
        expect(isValidGlob("/dir/*.js")).toBe(true);
        expect(isValidGlob("/dir/file.js")).toBe(true);
        expect(isValidGlob("file")).toBe(true);
    });
    it("Should return true with array of valid glob string", () => {
        expect(isValidGlob([ "/dir/*.js", "/dir/file.js", "file"])).toBe(true);
    });

    it("Should return false with empty string", () => {
        expect(isValidGlob("")).toBe(false);
    });

    it("Should return false with array with one or more invalid glob string", () => {
        expect(isValidGlob([ "/dir/*.js", null, "file"])).toBe(false);
    });
});

describe("is Non Empty String", () => {
    it("Should return false with non string value", () => {
        expect(isNonEmptyString(null)).toBe(false);
    });
    it("Should return true with empty string", () => {
        expect(isNonEmptyString("")).toBe(false);
    });

    it("Should return false with non empty string", () => {
        expect(isNonEmptyString("Some string")).toBe(true);
    });
});
describe("is Valid URL", () => {
    it("Should return true for valid URL", () => {
        expect(isValidURL("http://url.com")).toBe(true);
        expect(isValidURL("https://url.com")).toBe(true);
        expect(isValidURL("https://url.com/path?param=true")).toBe(true);
        expect(isValidURL("http://localhost:5000/")).toBe(true);
    });
    it("Should return false for invalid URL", () => {
        expect(isValidURL("www.url.com")).toBe(false);
        expect(isValidURL("www.$url.gr")).toBe(false);
        expect(isValidURL("url.fr")).toBe(false);
    });
});

describe("is Map Object", () => {
    it("Should return true for standard object", () => {
        expect(isMapObject({ prop: "string value" })).toBe(true);
        expect(isMapObject({ prop: 10 })).toBe(true);
        expect(isMapObject({ prop: false })).toBe(true);
        expect(isMapObject({ prop: null })).toBe(true);
    });

    it("Should return false for complex object", () => {
        expect(isMapObject({ prop: () => "function return"})).toBe(false);
        expect(isMapObject({ prop: [1, 2, 3, 4, 5] })).toBe(false);
        expect(isMapObject({ prop: { innerProp: "value" } })).toBe(false);
    });
});

describe("validator", () => {
    const validateObject = {
        name: {
            validate: [(str: string) => typeof str === "string"],
            error: "Invalid name",
        },
        age: {
            validate: [(str: string) => typeof str === "number"],
            error: "Invalid age",
        },
    };
    it("should return true with valid parameter", () => {
        const check = validator(validateObject);
        expect(check({ name: "My name", age: 10 })).toBe(true);
    });

    it("should return true with unmapped params", () => {
        const check = validator(validateObject);
        expect(check({ name: "My name", age: 10, unmaped: "my unmapped param" })).toBe(true);
    });

    it("should throw with invalid name", () => {
        const check = validator(validateObject);
        expect(() => check({ name: null, age: 10 })).toThrowError("Invalid name");
    });

    it("should throw with invalid age", () => {
        const check = validator(validateObject);
        expect(() => check({ name: "My name", age: null })).toThrowError("Invalid age");
    });
});
