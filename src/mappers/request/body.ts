import { IBody } from "@src/types";

const getRawBody = (body: IBody | undefined) => {
    if (!body || typeof body !== "object") { throw new Error("Invalid body value"); }
    return JSON.stringify(body, null, 2);
};

const getFormatOptions = () => ({
    raw: {
        language: "json",
    },
});

export default (body: IBody | undefined) => ({
    mode: "raw",
    raw: getRawBody(body),
    options: getFormatOptions(),
});
