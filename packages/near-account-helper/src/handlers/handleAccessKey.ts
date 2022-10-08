import { near } from "@graphprotocol/graph-ts";
import { AccessKey, FunctionCall } from "../../generated/schema";
import { getPublicKey } from "./utils";

export function handleAccessKey(action: near.ActionValue, id: string, accountID: string): void {
    const accessKeyData = new AccessKey(id);
    accessKeyData.accountId = accountID;
    let publickKey = "";

    if (action.kind === near.ActionKind.ADD_KEY) {
        const accessKey = action.toAddKey().accessKey;
        publickKey = getPublicKey(action.toAddKey().publicKey);
        if (accessKey.permission.kind === near.AccessKeyPermissionKind.FULL_ACCESS) {
            accessKeyData.kind = "FULL_ACCESS";
        } else if (accessKey.permission.kind === near.AccessKeyPermissionKind.FUNCTION_CALL) {
            const fnCallData = new FunctionCall(id);
            const fnCall = accessKey.permission.toFunctionCall();
            fnCallData.allowance = fnCall.allowance;
            fnCallData.methodNames = fnCall.methodNames;
            fnCallData.receiverId = fnCall.receiverId;
            fnCallData.save();

            accessKeyData.kind = "FUNCTION_CALL";
            accessKeyData.functionCall = id;
        }
    } else if (action.kind === near.ActionKind.DELETE_KEY) {
        accessKeyData.kind = "DELETE_KEY";
        publickKey = getPublicKey(action.toDeleteKey().publicKey);
    }
    accessKeyData.publickKey = publickKey;
    accessKeyData.save();
}
