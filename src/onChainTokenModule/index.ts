//@ts-nocheck

import {requiredParams} from './../utils/index';

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
            ],
            poap: [
                'xdai'
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
                image: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getInitialContractAddressMetaData (issuer:any) {

        const { contract, chain, openSeaSlug } = issuer;

        let collectionData = null;

        // POAP
        // TODO: move this into a registry like tokenLookup
        if (contract.toLowerCase() == "0x22c1f6050e56d2876009903609a2cc3fef83b415"){
            return {
                chain,
                contract,
                emblem: "https://storage.googleapis.com/subgraph-images/1647414847706poap.jpeg",
                title: "POAP Proof of attendance protocol"
            }
        }

        // try open sea first when there is a slug provided
        if (openSeaSlug !== undefined) {
            collectionData = await this.getContractDataOpenSea(contract, chain, openSeaSlug);
        }

        // if there is no slug or no data try moralis
        if(!collectionData){
            collectionData = await this.getContractDataMoralis(contract, chain);
        }

        // // if there is still no data try Alchemy
        if(openSeaSlug === undefined && !collectionData) {
            collectionData = await this.getContractDataAlchemy(contract, chain);
        }

        console.log('collectionData: ', collectionData);

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
                image: "https://storage.googleapis.com/opensea-rinkeby/0x381748c76f2b8871afbbe4578781cd24df34ae0d.png",
                title: "OpenSea Creature Sale"
        }
    */
    async getContractDataOpenSea(contractAddress:string, chain:string, openSeaSlug:string) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        const path = `/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`;

        return this.getDataOpensea(path, chain).then(response => {
            return  {
                chain,
                contractAddress,
                image: response.assets[0].collection.image_url,
                title: response.assets[0].collection.name
            };
        })
        .catch(err => console.error(err));

    }
    
    async getContractDataMoralis(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        const _chain = 'eth';

        const path = `/nft/${contractAddress}?chain=${_chain}&format=decimal&limit=1`;

        return this.getDataMoralis(path, chain)
            .then(response => {

            const image = JSON.parse(response.result[0].metadata).image;

            return {
                api: 'moralis',
                chain,
                contractAddress,
                image,
                title: response.result[0].name
            };
        })
        .catch(err => console.error(err));

    }
    
    async getContractDataAlchemy(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;

        const tokenId = "0";
        const withMetadata = "true";
        const path = `/getNFTsForCollection?contractAddress=${contractAddress}&cursorKey=${tokenId}&withMetadata=${withMetadata}`;

        return this.getDataAlchemy(path).then((result:any) => {

            if(!result.nfts.length) resolve([]);

                resolve({
                    api: 'alchemy',
                    chain,
                    contractAddress,
                    image: result.nfts[0].metadata.image,
                    title: result.nfts[0].title
                });
        }).catch(error => console.log('error', error)); // reject

    }

    async connectOnChainToken (issuer:string, owner:string) {

        const { contract, chain, openSeaSlug } = issuer;

        let tokens = [];

        if (contract.toLowerCase() == "0x22c1f6050e56d2876009903609a2cc3fef83b415"){
            return this.getTokensPOAP(owner);
        }

        if(openSeaSlug !== undefined) tokens = await this.getTokensOpenSea(contract, chain, owner, openSeaSlug);

        if(!tokens.length) tokens = await this.getTokensMoralis(contract, chain, owner);

        if(openSeaSlug === undefined && !tokens.length) tokens = await this.getTokensAlchemy(contract, chain, owner);

        return tokens;

    }

    async getTokensOpenSea(address:string, chain:string, owner:string, openSeaSlug:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        const path = `/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`;

        return this.getDataOpensea(path, chain)
                .then(response => {

                    return response.assets.map((item:any) => {
                        const image = item.image_url ? item.image_url : '';
                        const title = item.name ? item.name : '';
                        return {
                            api: 'opensea',
                            title: title,
                            image: image,
                            data: item
                        }
                    });
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
                    api: 'moralis',
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
                        api: 'alchemy',
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

    async getTokensPOAP(owner:string){

        // Uncomment to test a really large POAP collection - this guy gets around
        //let url = `https://api.poap.xyz/actions/scan/0x4d2803f468b736b62fe9eec992c8f4c41be4cb15`;
        let url = `https://api.poap.xyz/actions/scan/${owner}`;

        let res = await fetch(url, {
            method: 'GET'
        });

        let data = await res.json();

        let tokens = [];

        for (let token of data){

            tokens.push({
                title: token.event.name,
                image: token.event.image_url,
                data: token
            });
        }

        return tokens;
    }

}

export default OnChainTokenModule;
