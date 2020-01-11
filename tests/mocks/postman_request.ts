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
  event: validPostmanDummyExec,
  request: validPostmanGetRequest,
  response: [],
}

export {
  validPostmanGetRequest,
  validPostmanGetRequestItem,
  validPostmanDummyExec
}