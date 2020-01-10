"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const collection_1 = __importDefault(require("./mappers/collection"));
const navRequests = [
    {
        method: "GET",
        name: "Test 1 ",
        endpoint: "https://google.com/search",
        header: { "X-Device": "Mobile-iOS" },
        query: { q: "Olá" },
        test: ({ pm }) => {
            const { test, expect } = pm;
            test("My dummy test", () => {
                expect(1).to.be.eq(1);
            });
        },
    },
];
const collection = collection_1.default({ name: "My Collection" });
collection
    .addFolder("Navigation", navRequests)
    .addRequest(navRequests[0])
    .run();
fs_1.default.writeFileSync("src/sample/Newman.postman_collection.json", JSON.stringify(collection.toJSON()));
