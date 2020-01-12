import { EventTypes } from "@src/constants";

const validPostmanDummyExec = [
  "// Generated Test",
  "const testPipeline = ({ pm }) => {",
  "        const { test, expect } = pm;",
  "    test(\"My dummy test\", () => {",
  "        expect(1).to.be.eq(1);",
  "    });",
  "}",
  "testPipeline({ pm });",
  ""
]

const validPostmanDummyTestEvent = {
  listen: EventTypes.TEST,
  script: {
    exec: validPostmanDummyExec,
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
  validPostmanRequestGET as validPostmanGetRequest,
  validPostmanRequestItemGET as validPostmanGetRequestItem,
  validPostmanRequestPOST,
  validPostmanRequestItemPOST,
  validPostmanDummyExec,
  validPostmanDummyTestEvent
}