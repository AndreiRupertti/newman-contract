type Config = {
    name: string
}

export default ({ name }: Config) => ({
    name,
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
})