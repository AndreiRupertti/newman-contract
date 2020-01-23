import getContractGlobals from "@core/contract_globals";
const { contractUtils: utils } = getContractGlobals()

const fakeAjvErrors = [
  { keyword: "type", dataPath: ".stringProp", message: "should be string" },
  {
    keyword: "required",
    dataPath: ".requiredProp",
    params: { missingProperty: "requiredProp" },
    message: "should have required property '.requiredProp'"
  },
  {
    keyword: "additionalProperties",
    dataPath:  ".",
    params: { additionalProperty: "unkownProp" },
    message: "should NOT have additional properties"
  }
];

describe("BrokenContractError", () => {
  describe("When thorwing ajv errors", () => {
    it("should build correct messages", () => {
      expect(() => {throw new utils.BrokenContractError(fakeAjvErrors)})
        .toThrowError("Errors: ["
            + "\n\tProperty \".stringProp\": should be string"
            + "\n\tMissing required property \"requiredProp\""
            + "\n\tUnkown property: \"unkownProp\" (not in schema)"
        + "\n]");
    });
  });

  describe("When there are no errors to throw", () => {
    it("should build with empty message", () => {
      expect(() => {throw new utils.BrokenContractError([])}).toThrowError("");
    });
  });
});
