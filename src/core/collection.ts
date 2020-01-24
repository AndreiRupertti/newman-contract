import { getModulesFromPattern } from "@common/module_resolver";
import getContractGlobals from "@core/contract_globals";
import { buildGlobalSetterEvent, buildInfo, buildItem } from "@src/mappers";
import {
    ICollectionOptions,
    IContractCollectionOptions,
} from "@src/types";
import writeToFile from "./write_file";

const toJSON = (toParse: any) => JSON.parse(
    JSON.stringify(toParse, null, 2),
);

const ContractCollection = <T = {}> ({ fromPattern, name, exportToPath }: IContractCollectionOptions) => {
    const globals = getContractGlobals<T>();
    const contractCollection = toJSON({
        info: buildInfo({ name }),
        event: buildGlobalSetterEvent(globals),
        item: getModulesFromPattern(fromPattern).map((definition) => buildItem(definition, globals)),
    });

    if (exportToPath) { writeToFile(exportToPath, contractCollection); }

    return contractCollection;
};

export default ContractCollection;
