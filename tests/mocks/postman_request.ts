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
const validPostmanGetRequest = {
  header: [{ key: "X-Track-id", type: "text", value: "123456" }],
  method: "GET",
  url: {
    host: ["some-endpoint", "com"],
    path: ["search"],
    protocol: "https",
    query: [{ key: "q", value: "hello" }]
  }
};

const validPostmanGetRequestItem = {
  name: 'Valid Get Mock',
  event: validPostmanDummyTestEvent,
  request: validPostmanGetRequest,
  response: [],
}

export {
  validPostmanGetRequest,
  validPostmanGetRequestItem,
  validPostmanDummyExec,
  validPostmanDummyTestEvent
}