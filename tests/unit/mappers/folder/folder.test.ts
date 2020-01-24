import buildItem from "@mappers/collection/item";
import buildFolder from "@mappers/folder/folder";
import { validRequestGET, validRequestPOST } from "@tests/mocks/input_request";
import { validPostmanRequestItemGET } from "@tests/mocks/postman_request";

jest.mock("@mappers/collection/item", () => ({
    __esModule: true,
    default: jest.fn(() => validPostmanRequestItemGET),
}));

describe("Mapper for Collection folder", () => {
    beforeEach(jest.clearAllMocks);
    it("should return postman folder", () => {
        const requests = [validRequestGET, validRequestPOST];
        expect(buildFolder({ folderName: "Test Folder", requests })).toEqual({
            name: "Test Folder",
            item: [validPostmanRequestItemGET, validPostmanRequestItemGET],
        });
    });

    it("should return postman folder with no items when there are no requests", () => {
        expect(buildFolder({ folderName: "Test Folder", requests: [] })).toEqual({
            name: "Test Folder",
            item: [],
        });
        expect(buildItem).not.toBeCalled();
    });
});
