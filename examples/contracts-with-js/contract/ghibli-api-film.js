const { ContractDefinition } = require("newman-contract");
const { BASE_URL } = require("../constants")
const filmId = "58611129-2dbc-4a81-a72f-77ddfc1b1b49";

module.exports = ContractDefinition({
    name:  'GET My Neighbor Totoro',
    method: 'GET',
    endpoint: `${BASE_URL}/films/${filmId}`,
    schema: {
        type: 'object',
        required: [
            'id',
            'title',
            'description',
            'director',
            'producer',
            'release_date',
            'rt_score'
        ],
        properties: {
            id: {
                type: 'string'
            },
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            director: {
                type: 'string'
            },
            producer: {
                type: 'string'
            },
            release_date: {
                type: 'string'
            },
            rt_score: {
                type: 'string'
            }
        }
    }
})