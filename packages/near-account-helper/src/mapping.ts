import { near } from "@graphprotocol/graph-ts";
import { handleAccessKey, handleAccount, handleDeploy, handleFunctionCall, handleStake, handleTransfer } from "./handlers";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const id = receipt.receipt.id.toBase58();
  const to = receipt.receipt.receiverId;
  const actions = receipt.receipt.actions;
  
  for (let i = 0; i < actions.length; i++) {
    switch(actions[i].kind) {
      case near.ActionKind.ADD_KEY:
      case near.ActionKind.DELETE_KEY:
        handleAccessKey(actions[i], id, to);
        break;
      case near.ActionKind.CREATE_ACCOUNT:
      case near.ActionKind.DELETE_ACCOUNT:
        handleAccount(actions[i], id, to);
        break;
      case near.ActionKind.DEPLOY_CONTRACT:
        handleDeploy(actions[i].toDeployContract(), id, to);
        break;
      case near.ActionKind.FUNCTION_CALL:
        handleFunctionCall(actions[i].toFunctionCall(), id, to);
        break;
      case near.ActionKind.STAKE:
        handleStake(actions[i].toStake(), id, to);
        break;
      case near.ActionKind.TRANSFER:
        handleTransfer(actions[i].toTransfer(), id, to);
        break;
    }
  }
}
