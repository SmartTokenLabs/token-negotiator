import { ethers } from "ethers";
import { getTokens } from "./../core/index";
import { config } from "./../config/index";
import OverlayService from "./overlayService";
export class Client {
    constructor(filter = {}, tokenName, options = {}) {
        this.getTokenProofFromOutlet = (tokensOrigin, localStorageItemName, unsignedToken) => {
            this.getTokenProofFromOutletIframe(tokensOrigin, localStorageItemName, unsignedToken);
            return new Promise((resolve, reject) => {
                window.addEventListener('message', function (event) {
                    if (event.data.evt === 'setTokenProof') {
                        resolve(event.data.tokenProof);
                    }
                }, false);
            });
        };
        this.getTokenProofFromOutletIframe = (tokensOrigin, localStorageItemName, unsignedToken) => {
            return new Promise((resolve, reject) => {
                const iframe = document.createElement('iframe');
                iframe.src = tokensOrigin;
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                iframe.style.opacity = '0';
                document.body.appendChild(iframe);
                iframe.onload = () => {
                    iframe.contentWindow.postMessage({
                        evt: 'getTokenProof',
                        localStorageItemName: localStorageItemName,
                        unsignedToken: unsignedToken
                    }, "*");
                    resolve(true);
                };
            });
        };
        if (!tokenName)
            console.warn("Negotiator: tokenName is a required parameter");
        if (options.useOverlay === true && !options.tokenSelectorContainer)
            console.warn("Negotiator: options.tokenSelectorContainer is a required parameter");
        this.tokenName = tokenName;
        this.config = config[tokenName];
        this.options = options;
        this.filter = filter;
    }
    async negotiate() {
        if (this.options.useOverlay === true)
            this.negotiateViaOverlay();
        else {
            const tokens = await getTokens({
                filter: this.filter,
                tokenName: this.config.tokenName,
                tokensOrigin: this.config.tokenOrigin,
                localStorageItemName: this.config.localStorageItemName,
                tokenParser: this.config.tokenParser,
                unsignedTokenDataName: this.config.unsignedTokenDataName
            });
            return tokens;
        }
    }
    negotiateViaOverlay() {
        const overlayService = new OverlayService(this.config, this.options, this.filter);
        this.overlayClickHandler = overlayService.overlayClickHandler;
    }
    async connectMetamaskAndGetAddress() {
        if (!window.ethereum)
            throw new Error('Please install metamask to continue.');
        const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!userAddresses || !userAddresses.length)
            throw new Error("Active Wallet required");
        return userAddresses[0];
    }
    async signMessageWithBrowserWallet(message) {
        await this.connectMetamaskAndGetAddress();
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        return await signer.signMessage(message);
    }
    async authenticate({ unsignedToken, unEndPoint }) {
        if (!unsignedToken || !unEndPoint)
            return { status: false, useEthKey: null, proof: null };
        try {
            let useEthKey = await this.getChallengeSigned(unEndPoint);
            const attestedAddress = await this.validateUseEthKey(unEndPoint, useEthKey);
            const walletAddress = await this.connectMetamaskAndGetAddress();
            if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase())
                throw new Error('useEthKey validation failed.');
            const tokenProof = await this.getTokenProofFromOutlet(this.config.tokenOrigin, this.config.localStorageItemName, unsignedToken);
            return { status: true, useEthKey: useEthKey, proof: tokenProof };
        }
        catch (e) {
            console.error(e);
            return e;
        }
    }
    async validateUseEthKey(endPoint, data) {
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            });
            const json = await response.json();
            return json.address;
        }
        catch (e) {
            console.error(e);
            return '';
        }
    }
    async getUnpredictableNumber(endPoint) {
        try {
            const response = await fetch(endPoint);
            const json = await response.json();
            json.success = true;
            return json;
        }
        catch (e) {
            console.error(e);
            return {
                success: false,
                message: "UN request failed"
            };
        }
    }
    addTokenThroughIframe(magicLink) {
        const iframe = document.createElement('iframe');
        iframe.src = magicLink;
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        document.body.appendChild(iframe);
    }
    ethKeyIsValid(ethKey) {
        return ethKey.expiry >= Date.now();
    }
    async getChallengeSigned(unEndPoint) {
        const storageEthKeys = localStorage.getItem(this.config.localStorageEthKeyItemName);
        let ethKeys = (storageEthKeys && storageEthKeys.length) ? JSON.parse(storageEthKeys) : null;
        try {
            let address = await this.connectMetamaskAndGetAddress();
            address = address.toLowerCase();
            let useEthKey;
            if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
                delete ethKeys[address];
            }
            if (ethKeys && ethKeys[address]) {
                useEthKey = ethKeys[address];
            }
            else {
                useEthKey = await this.signNewChallenge(unEndPoint);
                if (useEthKey) {
                    ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
                    localStorage.setItem(this.config.localStorageEthKeyItemName, JSON.stringify(ethKeys));
                }
            }
            return useEthKey;
        }
        catch (e) {
            console.error(e);
            throw new Error(e.message);
        }
    }
    async signNewChallenge(unEndPoint) {
        let res = await this.getUnpredictableNumber(unEndPoint);
        const { number: UN, randomness, domain, expiration: expiry, messageToSign } = res;
        let signature = await this.signMessageWithBrowserWallet(messageToSign);
        const msgHash = ethers.utils.hashMessage(messageToSign);
        const msgHashBytes = ethers.utils.arrayify(msgHash);
        const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signature);
        return {
            address: recoveredAddress,
            expiry,
            domain,
            randomness,
            signature,
            UN
        };
    }
}
