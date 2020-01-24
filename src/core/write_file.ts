import * as fs from "fs";

export default (exportToPath: string, colllection: any) => {
    try {
        fs.writeFileSync(exportToPath, JSON.stringify(colllection, null, 2));
    } catch (e) {
        throw new Error(`could not export colllection to ${exportToPath}`);
    }
};
