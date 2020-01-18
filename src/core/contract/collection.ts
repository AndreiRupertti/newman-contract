import Collection from "@core/base_collection";
import { BrokenContractError } from "@core/contract/utils";
import {
    ICollectionOptions,
    IContractGlobals,
} from "@src/types";
// tslint:disable

const getContractGlobals = <T> (): IContractGlobals<T> => ({
    contractUtils: {
        BrokenContractError,
    }
} as any);

const ContractCollection = <T = {}> (collectionOptions: ICollectionOptions) => {
    const collection = Collection<IContractGlobals<T>>(collectionOptions);
    collection.setGlobals(getContractGlobals());

    return collection;
};

export default ContractCollection;
