import info from "@mappers/collection/info";
import item from "@mappers/collection/item";
import fs from "fs";
import * as newman from "newman";

const collection = {
    info: info({ name: "Newman Test" }),
    item: [
        item({
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
        }),
    ],
};

fs.writeFileSync("src/sample/Newman.postman_collection.json",  JSON.stringify(collection, null, 2));

newman.run({
    collection: JSON.parse(JSON.stringify(collection)),
    reporters: ["cli"],
}, process.exit as any);
