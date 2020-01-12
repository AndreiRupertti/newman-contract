import { EventTypes } from "@src/constants";

const validPostmanDummyTestExec = [
  "// Generated code for: test ",
  "const runTests = ({ pm }) => {",
  "        const { test, expect } = pm;",
  "    test(\"My dummy test\", () => {",
  "        expect(1).to.be.eq(1);",
  "    });",
  "}",
  "runTests({ pm });",
  ""
]
const validPostmanDummyPreRequestExec = [
  "// Generated code for: prerequest ",
  "const preRequestSetup = ({ pm }) => {",
  "        pm.setGlobalVariable('key', 'value');",
  "}",
  "preRequestSetup({ pm });",
  ""
]

const validPostmanDummyTestEvent = {
  listen: EventTypes.TEST,
  script: {
    exec: validPostmanDummyTestExec,
    id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    type: 'text/javascript'
  }
}

const validPostmanDummyPreRequestEvent = {
  listen: EventTypes.PRE_REQUEST,
  script: {
    exec: validPostmanDummyPreRequestExec,
    id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
    type: 'text/javascript'
  }
}
const validPostmanRequestGET = {
  header: [{ key: "X-Track-id", type: "text", value: "123456" }],
  method: "GET",
  url: {
    host: ["some-endpoint", "com"],
    path: ["search"],
    protocol: "https",
    query: [{ key: "q", value: "hello" }]
  }
};

const validPostmanRequestItemGET = {
  name: 'Valid Get Mock',
  event: validPostmanDummyTestEvent,
  request: validPostmanRequestGET,
  response: [],
}

const validPostmanRequestPOST = {
  header: [{ key: "X-Track-id", type: "text", value: "123456" }],
  method: "POST",
  body: {
    mode: "raw",
    raw: "{\"bodyInfo\":\"someInfo\"}",
    options: {
      raw: {
        language: "json"
      }
    }
  },
  url: {
    host: ["some-endpoint", "com"],
    path: ["search"],
    protocol: "https",
    query: [{ key: "q", value: "hello" }]
  }
};

const validPostmanRequestItemPOST = {
  name: 'Valid Get Mock',
  event: validPostmanDummyTestEvent,
  request: validPostmanRequestPOST,
  response: [],
}

export {
  validPostmanRequestGET,
  validPostmanRequestItemGET,
  validPostmanRequestPOST,
  validPostmanRequestItemPOST,
  validPostmanDummyTestExec,
  validPostmanDummyTestEvent,
  validPostmanDummyPreRequestExec,
  validPostmanDummyPreRequestEvent,
}