import { getModulesFromPattern } from "@common/module_resolver";
import getContractGlobals from "@core/contract_globals";
import { buildGlobalSetterEvent, buildInfo, buildItem } from "@src/mappers";
import {
    ICollectionOptions,
    IContractCollectionOptions,
} from "@src/types";

const toJSON = (toParse: any) => JSON.parse(
    JSON.stringify(toParse),
);

const ContractCollection = <T = {}> ({ fromPattern, name }: IContractCollectionOptions) => {
    const globals = getContractGlobals<T>();

    return toJSON({
        info: buildInfo({ name } as ICollectionOptions),
        event: buildGlobalSetterEvent(globals),
        item: getModulesFromPattern(fromPattern).map((definition) => buildItem(definition, globals)),
    });
};

export default ContractCollection;
