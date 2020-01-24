[![npm version](https://badge.fury.io/js/newman-contract.svg)](https://www.npmjs.com/package/newman-contract) [![Build Status](https://travis-ci.org/AndreiRupertti/newman-contract.svg?branch=master)](https://travis-ci.org/AndreiRupertti/newman-contract)

# Contract Testing using Newman

With `newman-contract` you dont need to relly on postman to read or write your contract tests, just write your contract definition like any other file and then use the powerful [newman](https://www.npmjs.com/package/newman) cli to run it!

If you are not familiar with Consumer-Driven contract tests using Postman, I recommend you to read [this article](https://medium.com/better-practices/consumer-driven-contract-testing-using-postman-f3580dba5370).

> :warning: This package is in early development and can still have major changes

#### Features:

- Creates a boilerplate collection for contract testing
- Human readable error messages
- Easy sorce control over your contracts
- Able to use `process.env` to build collections
- Support for esModules
- Typescipt definitions

## Getting Started

Install:

```
npm install --save newman
npm install --save newman-contract
```

Then, create a file exporting your contract definition:

```js
// contract/search.js
const { ContractDefinition } = require("newman-contract")
const baseUrl = "https://my-api.com"

module.exports = ContractDefinition({
  method: "GET",
  endpoint: `${baseUrl}/search`,
  params: { query: 'my term' }
  schema: {
    type: "object",
    properties: {
        // ... Your JSON schema to match response
    }
  }
})
```

Or, with ES Modules:

```js
import { ContractDefinition } from 'newman-contract'
export default ContractDefinition({ ... })
```

Now, you need to run newman with a `ContractCollection`

```js
const newman = require('newman')
const { ContractCollection } = require('newman-contract')

newman.run({
    collection: ContractCollection({ fromPattern: 'contract/*.js' })
    reporters: ['cli'] // You can use any newman reporter
})
```

## API Reference

#### `ContractDefinition(Object contract) -> Object`

Parse the given contract object to a contract definition, building a postman test to match the response to the given schema.

##### contract
- `method`: HTTP method
- `endpoint`: endpoint to wich the request is made (accepts encoded params)
- `schema`: response schema to match
- `name (optional)`: Name for the especific test
- `params (optinal)`: JSON Object containing all request params (priority over encoded params)
- `headers (optional)`: JSON Object containing all request headers
- `body (optional)`: JSON Object containing request body data


#### `ContractCollection(Object options) -> JSON Object`

Finds all Contract Definitions and builds a postman collection out of it.

##### options
- `fromPattern`: Glob pattern to find the contract definitions
- `name (optional)`: Custom name for collection (Default: 'Contract Collection')
- `exportToPath (optional)`: File path to wich the final collection will be exported to
