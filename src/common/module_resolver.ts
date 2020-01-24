import * as fg from "fast-glob";
import * as path from "path";

const hasDefaultImport = (moduleToImport: any) => "default" in moduleToImport;

const resolveDefaultImport = (moduleToImport: any) =>
    hasDefaultImport(moduleToImport) ? moduleToImport.default : moduleToImport;

const esmRequire = (resolvedPath: string) => require("esm")(module)(resolvedPath);

const fileToModule = (filePath: string) => {
    const resolvedPath = path.resolve(filePath);
    try {
        const moduleToImport = esmRequire(resolvedPath);
        return resolveDefaultImport(moduleToImport);
    } catch (e) {
        throw new Error(`cannot find module at ${resolvedPath}`);
    }
};

const getModulesFromPattern = (pattern: string | string[]) => fg.sync(pattern).map(fileToModule);

export {
    getModulesFromPattern,
};
