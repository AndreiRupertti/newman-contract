const UUID_TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
const TEMPLATE_CHAR = "x";

// tslint:disable no-bitwise
const createUUID = () => UUID_TEMPLATE
    .replace(/[xy]/g, (char) => {
       const result = Math.random() * 16 | 0;
       const value = char === TEMPLATE_CHAR ? result : (result & 0x3 | 0x8);
       return value.toString(16);
    });

export { createUUID };
