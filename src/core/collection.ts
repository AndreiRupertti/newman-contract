import { getModulesFromPattern } from "@common/module_resolver";
import getContractGlobals from "@core/contract_globals";
import { isNonEmptyString, isValidGlob, validator } from "@src/common/validator";
import { buildGlobalSetterEvent, buildInfo, buildItem } from "@src/mappers";
import {
    ContractCollectionBuilder, IValidateObject,
} from "@src/types";
import writeToFile from "./write_file";

const validateObject: IValidateObject = {
    fromPattern: {
        validate: [isValidGlob],
        error: '"fromPattern" should be a valid glob string (eg. "contract/*.(js|ts)").',
    },
    exportToPath: {
        validate: [isNonEmptyString],
        error: '"exportToPath" should be a valid file path (eg. "reports/contracts.json")',
    },
};

const toJSON = (toParse: any) => JSON.parse(
    JSON.stringify(toParse, null, 2),
);

const ContractCollection: ContractCollectionBuilder = ({ fromPattern, name, exportToPath }) => {
    const throwUnlessValid = validator(validateObject);
    throwUnlessValid({ fromPattern, name, exportToPath });

    const globals = getContractGlobals();
    const contractCollection = toJSON({
        info: buildInfo({ name }),
        event: [buildGlobalSetterEvent(globals)],
        item: getModulesFromPattern(fromPattern).map((definition) => buildItem(definition, globals)),
    });

    if (exportToPath) { writeToFile(exportToPath, contractCollection); }

    return contractCollection;
};

export default ContractCollection;
