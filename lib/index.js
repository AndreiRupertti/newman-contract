"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const info_1 = __importDefault(require("@mappers/collection/info"));
const item_1 = __importDefault(require("@mappers/collection/item"));
const fs_1 = __importDefault(require("fs"));
const newman = __importStar(require("newman"));
const collection = {
    info: info_1.default({ name: "Newman Test" }),
    item: [
        item_1.default({
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
        }),
    ],
};
fs_1.default.writeFileSync("src/sample/Newman.postman_collection.json", JSON.stringify(collection, null, 2));
newman.run({
    collection: JSON.parse(JSON.stringify(collection)),
    reporters: ["cli"],
}, process.exit);
