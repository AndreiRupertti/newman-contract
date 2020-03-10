const newman = require("newman")
const { ContractCollection } = require("newman-contract")

newman.run({
    collection: ContractCollection({ name: 'Ghibili Collection', fromPattern: 'contract/*.js' }),
    reporters: ['cli']
}, (errors) => {
    if (errors) console.log(errors);

    console.log('DONE!');
})