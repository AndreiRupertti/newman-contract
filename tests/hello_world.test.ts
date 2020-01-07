import { greeting } from '../src/hello_world'

describe("Dummy test", () => {
    test("Greeting", () => {
        expect(greeting()).toBe("Hello world")
    })
})