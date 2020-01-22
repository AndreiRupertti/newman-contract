#!/usr/bin/env node
import ContractCollection from "@core/contract/collection";
import { ICollectionOptions } from "@src/types";
import program from "commander";
import fg from "fast-glob";
import path from "path";

const mapModuleToContractDefinition = (filePath: string) => {
    try {
        const contractModule = require(path.resolve(filePath));
        return "default" in contractModule
            ? contractModule.default
            : contractModule;
    } catch {
        return null;
    }
};

const getContractDefinitions = (contractFiles: string[]) => contractFiles.map(mapModuleToContractDefinition);

const createContractCollection = async (options: ICollectionOptions , pattern: string[]) => {
    const contractDefinitions = getContractDefinitions(await fg(pattern));
    ContractCollection(options)
        .addRequests(contractDefinitions)
        .run();
};

// Program
program
  .command("run <ContractPathPattern>")
  .description("Runs the contract tests under the given pattern")
  .option("-n, --name <string>", "The name given to the collection to run", "Contract")
  .action((ContractPathPattern, { name }) => createContractCollection({ name }, ContractPathPattern));

program.parse(process.argv);
