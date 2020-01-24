import beautify from "@src/common/beautify";

const uglyCode: any = `
    const   fun =  (a,    b) => {
        return
         { b : {
                 c:
 a   }
}}
`;

const expectedCodeResult = `const fun = (a, b) => {
  return {
    b: {
      c: a
    }
  }
}
`;
describe("Beatify", () => {
    it("should format code as expected", () => {
        expect(beautify(uglyCode)).toBe(expectedCodeResult);
    });
});
