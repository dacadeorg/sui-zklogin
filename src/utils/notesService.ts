import { TransactionBlock } from '@mysten/sui.js/transactions';
import { PACKAGE_ID, SUI_CLIENT } from "./suiClient";
import { AuthService } from "./authService";

// a service to interact with the smart contract using SUI SDK
export class NotesService {

    async addNote(title: string, body: string) {
        const txb = new TransactionBlock();
        const txData = {
            target: `${PACKAGE_ID}::notes::create_note`,
            arguments: [
                txb.pure.string(title),
                txb.pure.string(body),
            ]
        };
        return this.makeMoveCall(txData, txb);
    }

    async getNotes() {
        const sender = AuthService.walletAddress();
        let ownedObjects = await SUI_CLIENT.getOwnedObjects({
            owner: sender
        });
        let ownedObjectsDetails = await Promise.all(ownedObjects.data.map(async (obj) => {
            return await SUI_CLIENT.getObject({ id: obj.data.objectId, options: { showType: true, showContent: true } });
        }));
        return ownedObjectsDetails.filter(obj => {
            return `${PACKAGE_ID}::notes::Note` === obj.data.type
        }).map(obj => obj.data.content['fields']);
    }

    async deleteNote(id: any) {
        const sender = AuthService.walletAddress();
        const txb = new TransactionBlock();
        txb.setSender(sender);
        const txData = {
            target: `${PACKAGE_ID}::notes::delete_note`,
            arguments: [
                txb.object(id.id),
            ]
        };
        await this.makeMoveCall(txData, txb);
    }

    private async makeMoveCall(txData: any, txb: TransactionBlock) {
        const keypair = AuthService.getEd25519Keypair();
        const sender = AuthService.walletAddress()
        txb.setSender(sender);
        txb.moveCall(txData);
        const { bytes, signature: userSignature } = await txb.sign({
            client: SUI_CLIENT,
            signer: keypair,
        });
        const zkLoginSignature = await AuthService.generateZkLoginSignature(userSignature);
        return SUI_CLIENT.executeTransactionBlock({
            transactionBlock: bytes,
            signature: zkLoginSignature,
        });
    }
}
