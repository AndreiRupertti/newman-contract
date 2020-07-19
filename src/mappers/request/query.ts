import { IQuery } from "@types";

type ITupla = [string, string];

export default (queryEntries: IQuery | ITupla[]) => {
  const entries = Array.isArray(queryEntries)
    ? queryEntries
    : Object.entries(queryEntries);
  return entries.map(([key, value]) => ({ key, value }));
};
