import { near } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";

export function handleAccount(action: near.ActionValue, id: string, to: string): void {
    const accountData = new Account(id);
    accountData.accountId = to;
    accountData.kind = action.kind === near.ActionKind.CREATE_ACCOUNT ? "CREATE_ACCOUNT" : "DELETE_ACCOUNT";
    if (action.kind === near.ActionKind.DELETE_ACCOUNT) {
        const deleteAction = action.toDeleteAccount();
        accountData.beneficiaryId = deleteAction.beneficiaryId;
    }
    accountData.save();
}
