import { near } from "@graphprotocol/graph-ts";
import { Deploy } from "../../generated/schema";

export function handleDeploy(action: near.DeployContractAction, id: string, to: string): void {
    const deployData = new Deploy(id);
    deployData.codeHash = action.codeHash.toHexString();
}