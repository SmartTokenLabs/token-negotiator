import { ethers } from "ethers";
export class EthersSign {
    constructor() { }
    static async signMessage(message) {
        await window.ethereum.send('eth_requestAccounts');
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        return await signer.signMessage(message);
    }
    static async signEip712(obj) {
        await window.ethereum.send('eth_requestAccounts');
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        const domain = {
            name: 'Devcon Ticket',
            version: '1',
            chainId: 3,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            salt: "0x64656667646667657267657274796a74796a6231000000000000000000000000"
        };
        const types = {
            Mail: [
                { name: 'attestor', type: 'string' },
                { name: 'contents', type: 'string' }
            ]
        };
        const value = {
            attestor: 'AlphaWallet attestaion',
            contents: 'MIGXMAkCAQYCAW8CAQAEQQQvZiRvuwETD_9d_eDp_4b0o0caeQ9FZ7e8hsxMi7SNsx-xkbfqtaNONRXQzQ1wO95bOVk3BRSdbQBNVLox62pCA0cAMEQCIFavePjptmgxBsVuHp7bZSDxK0ovB8d9URp2VjiGos56AiA9apKTL6Kk74Jgf2H7Mb4EZqlsdwJLXSN23sC6aoRyKg=='
        };
        const signature = await signer._signTypedData(domain, types, value);
        return signature;
    }
}
