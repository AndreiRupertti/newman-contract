import fs from "fs";
import Collection from "./core/base_collection";
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
  {
    method: "POST",
    name: "Valid POST Mock",
    endpoint: "w3schools.com/test/demo_form.php",
    header: { "X-Track-id": "123456"},
    query: { q: "hello" },
    body: { name1: "value1", name2: "value2" },
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
