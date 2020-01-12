export enum EventTypes {
    PRE_REQUEST = "prerequest",
    TEST = "test",
}

export const ExecFunctionName = {
    [EventTypes.PRE_REQUEST]: "preRequestSetup",
    [EventTypes.TEST]: "runTests",
};
