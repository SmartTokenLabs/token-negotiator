//@ts-nocheck

import { requiredParams, splitOnChainKey } from './../utils/index';

export class OnChainTokenModule {

    private apiConfigs = {
        opensea: {
            mainnet: {
                url: "https://api.opensea.io/api/v1/",
                apiKey: "3940c5b8cf4a4647bc22ff9b0a84f75a",
            },
            rinkeby: {
                url: "https://testnets-api.opensea.io/api/v1/",
                apiKey: "99687116fafa4daebc766eeedccce201"
            }
        },
        alchemy: {
            mainnet: {
                url: "https://eth-mainnet.alchemyapi.io/v2/",
                apiKey: "CWaS4PkRjFi3dAzrRD6lsrQ7vAyPYsnU",
            },
            rinkeby: {
                url: "https://eth-rinkeby.alchemyapi.io/v2/demo/",
                apiKey: ""
            }
        },
        moralis: {
            mainnet: {
                url: "https://deep-index.moralis.io/api/v2/",
                apikey: "WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF"
            }
        }
    };

    constructor() {}

    getOnChainAPISupportBool (apiName, chain) {

        const apiBlockchainSupport = {
            opensea: [
                'eth',
                'mainnet', 
                'rinkeby'
            ],
            alchemy: [
                'eth',
                'mainnet', 
                'rinkeby', 
                'arbitrum', 
                'polygon', 
                'optimism'
            ],
            moralis: [
                'eth',
                'mainnet', 
                'rinkeby',
                'ropsten',
                'goerli',
                'kovan',
                'bsc',
                'polygon',
                'mumbai',
                'avalanche',
                'fantom'
            ]
        }
        
        // TODO add support XDAI.
        // https://www.xdaichain.com/for-developers/developer-resources/ankr-api

        return apiBlockchainSupport[apiName].indexOf(chain) >= -1;

    }

    /**
     * @function getInitialContractAddressMetaData
     * @description returns initial contract address data collection name & image.
     * @param {String} issuerKey a concatenated string of the smart contract address and the chain.
     * @example issuerKey example: 0x381748c76f2b8871afbbe4578781cd24df34ae0d-rinkeby
     * @returns from searching API's
     * {
                chain: "rinkeby",
                contractAddress: "0x381748c76f2b8871afbbe4578781cd24df34ae0d",
                emblem: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getInitialContractAddressMetaData (issuerKey:string) {

        const { address, chain, openSeaSlug } = splitOnChainKey(issuerKey);

        let collectionData = null;

        // try open sea first when there is a slug provided
        if (openSeaSlug) collectionData = await this.getContractDataOpenSea(address, chain, openSeaSlug);

        // if there is no slug or no data try moralis
        if(!openSeaSlug || !collectionData) collectionData = await this.getContractDataMoralis(address, chain);

        // if there is still no data try Alchemy
        if(!openSeaSlug || !collectionData) collectionData = await this.getContractDataAlchemy(address, chain);

        return collectionData;
    }

    /**
     * @function getContractDataOpenSea
     * @description returns from OpenSea API initial contract address data collection name & image.
     * @param {string} contractAddress smart contract address
     * @param {string} chain chain name used to search via api
     * @returns 
     * {
                chain: "rinkeby",
                contractAddress: "0x381748c76f2b8871afbbe4578781cd24df34ae0d",
                emblem: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getContractDataOpenSea(contractAddress:string, chain:string, openSeaSlug:string) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        const path = `/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`;

        return this.getDataOpensea(path, chain)
                    .then(response => {
                        return  {
                            chain,
                            contractAddress,
                            emblem: response.assets[0].collection.image_url,
                            title: response.assets[0].collection.name
                        };
                    })
                    .catch(err => console.error(err));

    }
    
    async getContractDataMoralis(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        if(chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {

            const _chain = 'eth';

            const path = `/nft/${contractAddress}?chain=${_chain}&format=decimal&limit=1`;

            return this.getDataMoralis(path, chain)
                .then(response => {

                    const emblem = JSON.parse(response.result[0].metadata).image;

                    return {
                        chain,
                        contractAddress,
                        emblem,
                        title: response.result[0].name
                    };
                })
                .catch(err => console.error(err));
        } 

    }
    
    async getContractDataAlchemy(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;

        const tokenId = "0";
        const withMetadata = "true";
        const path = `/getNFTsForCollection?contractAddress=${contractAddress}&cursorKey=${tokenId}&withMetadata=${withMetadata}`;

        return this.getDataAlchemy(path).then((result:any) => {

            if(!result.nfts.length) resolve([]);

            resolve({
                chain,
                contractAddress,
                emblem: result.nfts[0].metadata.image,
                title: result.nfts[0].title
            });
        })
        .catch(error => console.log('error', error)); // reject

    }

    async connectOnChainToken (issuerKey:string, owner:string) {

        const { address, chain, openSeaSlug } = splitOnChainKey(issuerKey);

        let tokens = [];

        if(openSeaSlug) tokens = await this.getTokensOpenSea(address, chain, owner, openSeaSlug);

        if((!openSeaSlug || !tokens || !tokens.length) && address.toLowerCase() != "0xafd1a2f17ce2a694d2ef649fe5ba51cc0282448a") tokens = await this.getTokensMoralis(address, chain, owner);

        if(!tokens.length) tokens = await this.getTokensAlchemy(address, chain, owner);

        return tokens;

    }

    async getTokensOpenSea(address:string, chain:string, owner:string, openSeaSlug:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        const path = `/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`;

        return this.getDataOpensea(path, chain)
                .then(response => {
                    return response.assets;
                })
                .catch(err => console.error(err));
        
    }
    
    async getTokensMoralis(address:string, chain:string, owner:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        let _chain:string = chain;

        if (chain === 'mainnet') _chain = 'eth';

        const path = `/${owner}/nft/${address}?chain=${_chain}&format=decimal`;

        return this.getDataMoralis(path, chain).then((response:any) => {

            return response.result.map((item:any) => {

                const parsedMetaObj = JSON.parse(item.metadata);
                const image = parsedMetaObj.image ? parsedMetaObj.image : '';
                const title = parsedMetaObj.name ? parsedMetaObj.name : '';

                return {
                    title: title,
                    image: image,
                    data: parsedMetaObj
                }

            });

        })
        .catch(err => console.error(err));
        
    }

    async getTokensAlchemy (address:string, chain:string, owner:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;
        
        return new Promise((resolve, reject) => {

            const path = `/getNFTs/?owner=${owner}&contractAddresses[]=${address}`;

            this.getDataAlchemy(path, chain).then(result => {
                const tokens = result.ownedNfts.map((item) => {
                    return {
                        title: item.title,
                        image: item.metadata.image,
                        data: item
                    }
                });
                resolve(tokens);
            }).catch(error => console.log('error', error));

        });
    }

    async getDataOpensea(path, chain){

        const config = this.getConfigForServiceAndChain("opensea", chain);

        let options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-API-KEY': config.apiKey
            }
        };

        // TODO: consolidate, make a function for combining URL parts.
        const url = config.url +
            (config.url.charAt(config.url.length - 1) != "/" && path.charAt(0) != "/" ? "/" : "") +
            path;

        return await this.httpJsonRequest(url, options)
    }

    async getDataAlchemy(path, chain){

        var options = {
            method: 'GET',
            headers: {
                redirect: 'follow'
            }
        };

        const config = this.getConfigForServiceAndChain("alchemy", chain);

        const url = (config.url.charAt(config.url.length - 1) != "/" ? config.url+"/" : config.url) +
                    config.apiKey +
                    (path.charAt(0) != "/" ? "/"+path : path);

        return await this.httpJsonRequest(url, options)
    }

    async getDataMoralis(path, chain){

        const config = this.getConfigForServiceAndChain("moralis", chain);

        const options = {
            method: 'GET',
            headers: {
                'x-api-key': config.apiKey
            }
        };

        const url = config.url +
                    (config.url.charAt(config.url.length - 1) != "/" && path.charAt(0) != "/" ? "/" : "") +
                    path;

        return await this.httpJsonRequest(url, options)
    }

    getConfigForServiceAndChain(service:string, chain:string, defaultCred:string = "mainnet"){

        if (!this.apiConfigs[service])
            return null;

        if (chain == "eth")
            chain = "mainnet";

        const configs = this.apiConfigs[service];

        if (configs[chain])
            return configs[chain];

        if (defaultCred && configs[defaultCred])
            return configs[defaultCred]

        throw new Error("API config not available for alchemy chain: " + chain);
    }

    async httpJsonRequest(url, requestOptions){

        return await fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                resolve(result);
            });
    }

}

export default OnChainTokenModule;
