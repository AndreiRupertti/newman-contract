import ContractCollection from "@core/collection";
import writeToFile from "@core/write_file";
import contractGlobals from "@core/contract_globals";
import { buildGlobalSetterEvent, buildInfo, buildItem } from "@src/mappers";
import {
  validPostmanDummyPreRequestEvent,
  validPostmanRequestItemGET
} from "@tests/mocks/postman_request";

jest.mock("@core/write_file", () => jest.fn());

jest.mock("@core/contract_globals");
const mockedContractGlobals = contractGlobals as jest.Mock;

jest.mock("@common/module_resolver", () => ({
  getModulesFromPattern: jest.fn(() => [{ name: "module definition " }])
}));

jest.mock("@src/mappers", () => ({
  buildGlobalSetterEvent: jest.fn(() => validPostmanDummyPreRequestEvent),
  buildInfo: jest.fn(() => ({ name: "Collection info" })),
  buildItem: jest.fn(() => validPostmanRequestItemGET)
}));

describe("Contract Collection", () => {
  beforeAll(() => {
    mockedContractGlobals.mockReturnValue({
      contractUtils: {}
    });
  });
  beforeEach(jest.clearAllMocks);

  describe("When creating a new contract collection", () => {
    it("should init info object", () => {
      ContractCollection({ name: "Contract collection", fromPattern: "*" });
      expect(buildInfo).toBeCalledWith({ name: "Contract collection" });
    });

    it("should set contract utils as global variable of collection", () => {
      ContractCollection({ name: "Contract collection", fromPattern: "*" });
      expect(buildGlobalSetterEvent).toBeCalledWith({ contractUtils: {} });
    });

    it("should build item with global variables", () => {
      ContractCollection({ name: "Contract collection", fromPattern: "*" });
      expect(buildItem).toBeCalledWith(
        { name: "module definition " },
        { contractUtils: {} }
      );
    });

    it("should write to file when a exportToPath value is given", () => {
      const collection = ContractCollection({
        fromPattern: "*",
        exportToPath: "./path/file.json"
      });
      expect(writeToFile).toBeCalledWith("./path/file.json", collection);
    });

    it("should return an instace of base collection", () => {
      const contractCollection = ContractCollection({
        name: "Contract collection",
        fromPattern: "*"
      });
      expect(contractCollection).toEqual({
        info: { name: "Collection info" },
        item: [validPostmanRequestItemGET],
        event: [validPostmanDummyPreRequestEvent]
      });
    });
  });
});
