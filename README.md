[![Build Status](https://travis-ci.org/AndreiRupertti/newman-contract.svg?branch=master)](https://travis-ci.org/AndreiRupertti/newman-contract)

# newman-contract
A helper library for contract testing using newman


## Getting Started

Install:
```
npm install --save newman
npm install --save newman-contract
```

Then, create a file with exporting your contract definition:
``` js
// tests/contract/my-contract.js
const { ContractDefinition } = require('newman-contract')
const baseUrl = 'https://my-endpoint.com'

module.exports = ContractDefinition({
    method: 'GET',
    endpoint: `${baseUrl}/route-path`,
    schema: {
        type: 'object',
        properties: {
            // ...
        }
    }
})
```

Now, you need to run newman with a contract collection
```js
const newman = require('newman')
const { ContractCollection } = require('newman-contract')

const options = {
    fromPattern: 'tests/contract/*' ,
    name: 'My Collection', //optional
    exportToPath: './contract/collection.json' //optional
}

newman.run({
    collection: ContractCollection(options)
    reporters: ['cli']
})
```

