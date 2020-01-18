import { ITestExec } from '@types'

const dummyTestExec: ITestExec = ({ pm }) => {
    const { test, expect } = pm;
    test("My dummy test", () => {
        expect(1).to.be.eq(1);
    })
};

const dummyPreRequestExec: ITestExec = ({ pm }) => {
    pm.setGlobalVariable('key', 'value');
};

const validContractDefinition = {
    method: "GET",
    name: "Valid Contract Definition",
    endpoint: "https://some-endpoint.com/search",
    header: { "X-Track-id": "123456"},
    query: { q: "hello" },
    schema: {}
}

const validRequestGET = {
    method: "GET",
    name: "Valid Get Mock",
    endpoint: "https://some-endpoint.com/search",
    header: { "X-Track-id": "123456"},
    query: { q: "hello" },
    test: dummyTestExec
}

const validRequestPOST = {
    method: "POST",
    name: "Valid POST Mock",
    endpoint: "https://some-endpoint.com/search",
    header: { "X-Track-id": "123456"},
    query: { q: "hello" },
    body: { "bodyInfo": "someInfo" },
    test: dummyTestExec
}

export {
    validRequestPOST,
    validRequestGET,
    dummyTestExec,
    dummyPreRequestExec,
    validContractDefinition
}