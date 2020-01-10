import fs from "fs";
import Collection from "./mappers/collection";
import { IRequestDefinition } from "./types";

const navRequests: IRequestDefinition[] = [
  {
    method: "GET",
    name: "Test 1 ",
    endpoint: "https://google.com/search",
    header: { "X-Device": "Mobile-iOS"},
    query: { q: "Olá" },
    test: ({ pm }) => {
      const { test, expect } = pm;
      test("My dummy test", () => {
        expect(1).to.be.eq(1);
      });
    },
  },
];
const collection = Collection({ name: "My Collection"});
collection
  .addFolder("Navigation", navRequests)
  .addRequest(navRequests[0])
  .run();

fs.writeFileSync("src/sample/Newman.postman_collection.json", JSON.stringify(collection.toJSON()));
