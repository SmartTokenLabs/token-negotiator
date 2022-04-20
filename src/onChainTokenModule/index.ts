import {requiredParams} from './../utils/index';

export class OnChainTokenModule {
    
    onChainModuleKeys: { moralis: any; alchemy: any; opensea: any; };

    constructor(onChainModuleKeys: any) {
        this.onChainModuleKeys = {
            moralis: onChainModuleKeys?.moralis ?? 'WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF',
            alchemy: onChainModuleKeys?.alchemy ?? 'CWaS4PkRjFi3dAzrRD6lsrQ7vAyPYsnU', 
            opensea: onChainModuleKeys?.openSea ?? '99687116fafa4daebc766eeedccce201'
        };
    }

    getOnChainAPISupportBool (apiName:string, chain:string) {

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

        // @ts-ignore
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
        
        if(chain.toLocaleLowerCase() === "rinkeby") {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': this.onChainModuleKeys.opensea }};

            return fetch(`https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {
                return  {
                    chain,
                    contractAddress,
                    image: response.assets[0].collection.image_url,
                    title: response.assets[0].collection.name
                };
            })
            .catch(err => {
                console.log('failed to collect contract data from OpenSea API');
            });
        
        } 
        
        if(chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': this.onChainModuleKeys.opensea }};

            return fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
            .then(response => {
                return  {
                    chain,
                    contractAddress,
                    image: response.assets[0].collection.image_url,
                    title: response.assets[0].collection.name
                };
            })
            .catch(err => {
                console.log('failed to collect contract data from OpenSea API');
            });
        
        } 

        return;

    }
    
    async getContractDataMoralis(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        const options = { 
            method: 'GET',
            headers: {
                'x-api-key': this.onChainModuleKeys.moralis
            }
        };

        return fetch(`https://deep-index.moralis.io/api/v2/nft/${contractAddress}?chain=${chain}&format=decimal&limit=1`, options)
        .then(response => response.json())
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
        .catch(error => {
            console.log('failed to collect contract data from Moralis API');
        });
        
    }
    
    async getContractDataAlchemy(contractAddress:string, chain:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;

        var requestOptions = {
            method: 'GET',
            headers: {
                redirect: 'follow'
            }
        };

        const apiKey = this.onChainModuleKeys.alchemy;
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
        const tokenId = "0";
        const withMetadata = "true";
        const fetchURL = `${baseURL}?contractAddress=${contractAddress}&cursorKey=${tokenId}&withMetadata=${withMetadata}`;
    
        const promise = new Promise((resolve, reject) => {
            fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then((result:any) => {
                
                if(!result.nfts.length) resolve([]);

                resolve({
                    api: 'alchemy',
                    chain,
                    contractAddress,
                    image: result.nfts[0].metadata.image,
                    title: result.nfts[0].title
                });
            })
            .catch(error => {
                console.log('failed to collect contract data from Alchemy API');
            });
            
        });
        return promise;
    }

    async connectOnChainToken (issuer:string, owner:string) {

        // @ts-ignore
        const { contract, chain, openSeaSlug } = issuer;

        let tokens = [];

        if (contract.toLowerCase() == "0x22c1f6050e56d2876009903609a2cc3fef83b415"){
            return this.getTokensPOAP(owner);
        }

        if(openSeaSlug !== undefined) tokens = await this.getTokensOpenSea(contract, chain, owner, openSeaSlug);

        if(!tokens.length) tokens = await this.getTokensMoralis(contract, chain, owner);

        if(openSeaSlug === undefined && !tokens.length) {
            // @ts-ignore
            tokens = await this.getTokensAlchemy(contract, chain, owner);
        }

        return tokens;

    }

    async getTokensOpenSea(address:string, chain:string, owner:string, openSeaSlug:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('opensea', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        if(chain === 'rinkeby') {

            let options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-KEY': this.onChainModuleKeys.opensea}};
            
            return fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
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
            .catch(error => {
                console.log('failed to collect tokens from OpenSea API');
            });

        }
        
        if(chain === 'mainnet' || chain === 'eth') {

            let options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': this.onChainModuleKeys.opensea} };
            
            return fetch(`https://api.opensea.io/api/v1/assets?owner=${owner}&collection=${openSeaSlug}&order_direction=desc&offset=0&limit=20`, options)
            .then(response => response.json())
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
            .catch(error => {
                console.log('failed to collect tokens from OpenSea API');
            });
        }

        return;
    }
    
    async getTokensMoralis(address:string, chain:string, owner:string, offset=0, limit=20) {

        if(this.getOnChainAPISupportBool('moralis', chain) === false) return;

        requiredParams((chain && address && owner), 'cannot search for tokens, missing params');

        let _chain:string = chain;

        if (chain === 'mainnet') _chain = 'eth';

        const options = {
            method: 'GET',
            headers: {
                'x-api-key': this.onChainModuleKeys.moralis
            }
        };

        return fetch(`https://deep-index.moralis.io/api/v2/${owner}/nft/${address}?chain=${_chain}&format=decimal`, options)
        .then(response => response.json())
        .then((response:any) => {

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
        .catch(error => {
            console.log('failed to collect tokens from Moralis API');
        });
        
    }

    async getTokensAlchemy (address:string, chain:string, owner:string) {

        if(this.getOnChainAPISupportBool('alchemy', chain) === false) return;
        
        const promise = new Promise((resolve, reject) => {

            var requestOptions = {
                method: 'GET',
                headers: {
                    redirect: 'follow'
                }
            };
            
            const apiKey = this.onChainModuleKeys.alchemy;
            const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs`;
            const fetchURL = `${baseURL}?owner=${owner}&contractAddresses[]=${address}`;
            
            fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(result => {
                const tokens = result.ownedNfts.map((item:any) => {
                    return {
                        api: 'alchemy',
                        title: item.title,
                        image: item.metadata.image,
                        data: item
                    }
                });
                resolve(tokens);
            })
            .catch(error => {
                console.log('failed to collect tokens from Alchemy API');
            });
        });

        return promise;
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

    // look up tokens server:

    // OPENSEA

    // const options = {method: 'GET'};

    // fetch('https://testnets-api.opensea.io/api/v1/asset_contract/0x586707c50670c322697e00275e3dc72543d1018f', options)
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));

    // {
    //     "collection": {
    //       "banner_image_url": null,
    //       "chat_url": null,
    //       "created_date": "2022-04-08T06:42:52.351995",
    //       "default_to_fiat": false,
    //       "description": "Smart Token Labs Test NFTs for use in our various projects",
    //       "dev_buyer_fee_basis_points": "0",
    //       "dev_seller_fee_basis_points": "0",
    //       "discord_url": null,
    //       "display_data": {
    //         "card_display_style": "contain",
    //         "images": []
    //       },
    //       "external_url": "https://smarttokenlabs.com/",
    //       "featured": false,
    //       "featured_image_url": null,
    //       "hidden": false,
    //       "safelist_request_status": "not_requested",
    //       "image_url": "https://lh3.googleusercontent.com/aBVhl3os0yGuKyU1vmPtISPej1eXadNQA_FDY0VUfmjDxpz9EGqxK9hoPM9uwrlVlsqJLJZBmOh63tfaCwM_EQaQJvcWnJE6TG5GUCM=s120",
    //       "is_subject_to_whitelist": false,
    //       "large_image_url": "https://lh3.googleusercontent.com/aBVhl3os0yGuKyU1vmPtISPej1eXadNQA_FDY0VUfmjDxpz9EGqxK9hoPM9uwrlVlsqJLJZBmOh63tfaCwM_EQaQJvcWnJE6TG5GUCM",
    //       "medium_username": null,
    //       "name": "STL Riot Racers NFTs V2",
    //       "only_proxied_transfers": false,
    //       "opensea_buyer_fee_basis_points": "0",
    //       "opensea_seller_fee_basis_points": "250",
    //       "payout_address": "",
    //       "require_email": false,
    //       "short_description": null,
    //       "slug": "stl-riot-racers-nfts-v2",
    //       "telegram_url": null,
    //       "twitter_username": null,
    //       "instagram_username": null,
    //       "wiki_url": null,
    //       "is_nsfw": false
    //     },
    //     "address": "0x586707c50670c322697e00275e3dc72543d1018f",
    //     "asset_contract_type": "non-fungible",
    //     "created_date": "2022-04-08T01:14:43.653056",
    //     "name": "STLTestRiotRacersNFTs",
    //     "nft_version": "3.0",
    //     "opensea_version": null,
    //     "owner": null,
    //     "schema_name": "ERC721",
    //     "symbol": "STLRR",
    //     "total_supply": "0",
    //     "description": "Smart Token Labs Test NFTs for use in our various projects",
    //     "external_link": "https://smarttokenlabs.com/",
    //     "image_url": "https://lh3.googleusercontent.com/aBVhl3os0yGuKyU1vmPtISPej1eXadNQA_FDY0VUfmjDxpz9EGqxK9hoPM9uwrlVlsqJLJZBmOh63tfaCwM_EQaQJvcWnJE6TG5GUCM=s120",
    //     "default_to_fiat": false,
    //     "dev_buyer_fee_basis_points": 0,
    //     "dev_seller_fee_basis_points": 0,
    //     "only_proxied_transfers": false,
    //     "opensea_buyer_fee_basis_points": 0,
    //     "opensea_seller_fee_basis_points": 250,
    //     "buyer_fee_basis_points": 0,
    //     "seller_fee_basis_points": 250,
    //     "payout_address": ""
    //   }

    // MORALIS


}

export default OnChainTokenModule;
