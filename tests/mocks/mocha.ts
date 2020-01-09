const mochaChainProperties = [
    'to',
    'be',
    'eq'
]

const mockChain = () => ({
    to: {
        be: {
            eq: jest.fn()
        }
    }
});

const mochaMock = () => {
    const mock = mockChain()
    return {
        _mock: mock,
        test: jest.fn((name: string, callback: () => void) => name && callback()),
        expect: jest.fn().mockReturnValue(mock)
    }
}

export default mochaMock;