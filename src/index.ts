import fs from "fs";
import Collection from "./core/base_collection";
import { IRequestDefinition, ITestExec } from "./types";

interface IGlobal { myGlobalNumber: number; }
const DummyTestWithGlobal: ITestExec<IGlobal> = ({ pm, myGlobalNumber }) => {
  const { test, expect } = pm;
  test("My dummy test", () => {
    expect(myGlobalNumber).to.be.eq(10);
  });
};

const DummyTest: ITestExec = ({ pm }) => {
  const { test, expect } = pm;
  test("My dummy test", () => {
    expect(1).to.be.eq(1);
  });
};

const navRequests: Array<IRequestDefinition<IGlobal>> = [
  {
    method: "GET",
    name: "Test 1 ",
    endpoint: "https://google.com/search",
    header: { "X-Device": "Mobile-iOS"},
    query: { q: "Olá" },
    test: DummyTestWithGlobal,
  },
  {
    method: "POST",
    name: "Valid POST Mock",
    endpoint: "https://w3schools.com/test/demo_form",
    header: { "X-Track-id": "123456"},
    query: { q: "hello" },
    body: { name1: "value1", name2: "value2" },
    test: DummyTest,
},
];
const collection = Collection<IGlobal>({ name: "My Collection"});
collection
  .setGlobals({ myGlobalNumber: 10 })
  .addFolder("Navigation", navRequests)
  .addRequest(navRequests[0])
  .run();

fs.writeFileSync("src/sample/Newman.postman_collection.json", JSON.stringify(collection.toJSON()));
