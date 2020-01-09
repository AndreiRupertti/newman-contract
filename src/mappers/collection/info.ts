interface IConfig {
    name: string;
}

export const DEFAULT_SCHEMA = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";

export default ({ name }: IConfig) => ({
    name,
    schema: DEFAULT_SCHEMA,
});
