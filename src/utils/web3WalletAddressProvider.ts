import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from 'fortmatic';
import Portis from '@portis/web3';
import Web3 from 'web3';
import Torus from "@toruslabs/torus-embed";
import Authereum from 'authereum';

// walletAddressProvider is designed to collect a stateful list of user 
// owned addressess from multiple networks.

export class Web3WalletAddressProvider {

    callBackFn: any;
    state: any;
    registeredWalletProviders:any;
    WalletConnectChainId:any;
    networks: any;

    constructor( walletType:string ) {

        this.networks = {
            1: {
                chainName: "Ethereum",
            },
            3: {
                chainName: "Ropsten",
            },
            4: {
                chainName: "Rinkeby",
            },
            5: {
                chainName: "Goerli",
            },
            42: {
                chainName: "Kovan",
            },
            85: {
                chainName: "Polygon",
            },
            80001: {
                chainName: "Mumbai",
            },
        }

        // @ts-ignore
        this.state = { addresses: [ /* { address, chainName, networkId } */ ] };

        // @ts-ignore
        this.callBackFn = null;

        // @ts-ignore
        this.registeredWalletProviders = {};

        this.connect(walletType);
        
    }

    // event hook of new addresses added to the module
    onUpdate( callBackFn?:any ) {

        if(callBackFn) {

            this.callBackFn = callBackFn;

        } else {

            return this.callBackFn.call(null, this.state.addresses);

        }

    }

    connect ( walletType: string) {

        // @ts-ignore
        this[walletType]();

    };

    registerNewWalletProvider ( walletType: any, walletProvierInstance:any ) {

        this.registeredWalletProviders[walletType] = { instance: walletProvierInstance };

    };
    
    unRegisterWalletProvider ( walletType: any ) {

        delete this.registeredWalletProviders[walletType];

    };

    registerNewWalletAddress ( address:string, chainId:string ) {

        // @ts-ignore
        const chainName = this.networks[chainId].chainName;
        
        this.state.addresses.push({ address, chainName, chainId });

        console.log('connect with MM', this.state);

        debugger;

        this.onUpdate();

    };

    async getWeb3ChainId ( web3: any) {

        // @ts-ignore
        return web3.eth.getChainId();

    };

    async getWeb3Accounts( web3: any ) {

        // @ts-ignore
        return web3.eth.getAccounts();

    };

    async getWeb3ChainIdAndAccounts( web3: any ) {

        const chainId = await this.getWeb3ChainId( web3 );
        
        const accounts = await this.getWeb3Accounts( web3 );

        return { chainId, accounts };

    };

    async MetaMask () {

        console.log('connect MetaMask');
      
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
            
            // @ts-ignore
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            // @ts-ignore
            const hexChainId = await ethereum.request({ method: 'eth_chainId' });

            const accountAddress = accounts[0];

            console.log('connect with MM', accountAddress);

            // @ts-ignore
            this.registerNewWalletAddress(accountAddress, parseInt(hexChainId, 16));

        }
        
    };

    async WalletConnect () {

        console.log('connect Wallet Connect');

        //  Create WalletConnect Provider
        const walletConnectProvider = new WalletConnectProvider({
            infuraId: "7753fa7b79d2469f97c156780fce37ac",
        });
        
        // Subscribe to accounts change
        walletConnectProvider.on("accountsChanged", (accounts: string[]) => {

            if (this.WalletConnectChainId) {

                this.registerNewWalletAddress(accounts[0], this.WalletConnectChainId);
                
            }

        });
            
        // Subscribe to chainId change
        walletConnectProvider.on("chainChanged", (chainId: number) => {

            console.log(chainId);

            this.WalletConnectChainId = chainId;

        });
        
        // Subscribe to session disconnection
        walletConnectProvider.on("disconnect", (code: number, reason: string) => {

            console.log(code, reason);

            this.unRegisterWalletProvider("WalletConnect");

        });
        
        //  Enable session (triggers QR Code modal)
        walletConnectProvider.enable();

        // register reference to provider
        this.registerNewWalletProvider( "WalletConnect", walletConnectProvider );

    };

    async Fortmatic () {

        console.log('connect Fortmatic');

        // https://replit.com/@fortmatic/demo-kitchen-sink

        const fm = new Fortmatic('pk_test_96DF5BB9127A2C79');
        
        // @ts-ignore
        const web3 = new Web3(fm.getProvider());

        const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

        this.registerNewWalletAddress(accounts[0], chainId);

        this.registerNewWalletProvider( "Fortmatic", web3 );

    };

    async Torus () {

        console.log('connect Torus');

        const torus = new Torus();
        
        await torus.init();

        await torus.login();
        
        // @ts-ignore
        const web3 = new Web3(torus.provider);

        const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

        this.registerNewWalletAddress(accounts[0], chainId);

        this.registerNewWalletProvider( "Fortmatic", web3 );

    };

    async Portis () {

        console.log('connect Portis');

        // https://docs.portis.io/#/methods

        const portis = new Portis("211b48db-e8cc-4b68-82ad-bf781727ea9e", "rinkeby");

        portis.onError(error => { console.log('portis error', error) });

        const web3 = new Web3(portis.provider);

        const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

        this.registerNewWalletAddress(accounts[0], chainId);

        this.registerNewWalletProvider( "Fortmatic", web3 );

    };

    async Authereum  () {

        console.log('connect Authereum');

        const authereum = new Authereum('kovan');

        const authereumProvider = authereum.getProvider();

        const web3 = new Web3(authereumProvider);

        await authereumProvider.enable();

        // register reference to provider
        this.registerNewWalletProvider( "Authereum", authereumProvider );

        const { accounts, chainId } = await this.getWeb3ChainIdAndAccounts( web3 );

        this.registerNewWalletAddress(accounts[0], chainId);

    };

}

// walletAddressProvider.connect('WalletConnect');
// walletAddressProvider.connect('Fortmatic');
// walletAddressProvider.connect('Portis');
// walletAddressProvider.connect('Torus');
// walletAddressProvider.connect('Authereum');
// walletAddressProvider.connect('MetaMask');