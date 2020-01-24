jest.mock('esm', () => {
    return jest.fn(() => {
        return require;
    })
});