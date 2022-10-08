import { near } from "@graphprotocol/graph-ts";

export function getPublicKey(publicKey: near.PublicKey): string {
    switch (publicKey.kind) {
        case near.CurveKind.ED25519:
            return "ed25519:" + publicKey.bytes.toBase58();
        case near.CurveKind.SECP256K1:
            return "secp256k1:" + publicKey.bytes.toBase58();
        default:
            break;
    }
    return publicKey.bytes.toBase58();
}
