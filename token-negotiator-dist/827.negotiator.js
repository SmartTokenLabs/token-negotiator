"use strict";(self.webpackChunknegotiator=self.webpackChunknegotiator||[]).push([[827],{18827:(e,t,n)=>{n.r(t),n.d(t,{Web3WalletProvider:()=>a,default:()=>u});var o=n(91023),r=n(241),i=n(93951),s=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{a(o.next(e))}catch(e){i(e)}}function c(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}a((o=o.apply(e,t||[])).next())}))},c=function(e,t){var n,o,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,o=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(r=s.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},a=function(){function e(e,t){this.connections={},this.client=e,this.safeConnectOptions=t}return e.prototype.saveConnections=function(){var t={};for(var n in this.connections){var r=this.connections[n];t[n]={address:r.address,chainId:r.chainId,providerType:r.providerType,blockchain:r.blockchain,ethers:o}}localStorage.setItem(e.LOCAL_STORAGE_KEY,JSON.stringify(t))},e.prototype.emitSavedConnection=function(e){return Object.keys(this.connections).length&&e?(this.client.eventSender.emitConnectedWalletInstance(this.connections[e.toLocaleLowerCase()]),this.connections[e.toLocaleLowerCase()]):null},e.prototype.emitNetworkChange=function(e){if(e)return this.client.eventSender.emitNetworkChange(e),e},e.prototype.deleteConnections=function(){this.connections={},localStorage.removeItem(e.LOCAL_STORAGE_KEY),localStorage.removeItem("walletconnect")},e.prototype.loadConnections=function(){return s(this,void 0,void 0,(function(){var t,n,o,r,i,s,a,u;return c(this,(function(c){switch(c.label){case 0:if(!(t=localStorage.getItem(e.LOCAL_STORAGE_KEY)))return[2];if(!(n=JSON.parse(t)))return[2];for(r in o=[],n)o.push(r);i=0,c.label=1;case 1:if(!(i<o.length))return[3,6];s=o[i],a=n[s],c.label=2;case 2:return c.trys.push([2,4,,5]),[4,this.connectWith(a.providerType,!0)];case 3:return c.sent(),[3,5];case 4:return u=c.sent(),console.log("Wallet couldn't connect"+u.message),delete n[s],this.saveConnections(),this.emitSavedConnection(s),[3,5];case 5:return i++,[3,1];case 6:return[2]}}))}))},e.prototype.connectWith=function(e,t){return void 0===t&&(t=!1),s(this,void 0,void 0,(function(){var n;return c(this,(function(o){switch(o.label){case 0:if(!e)throw new Error("Please provide a Wallet type to connect with.");return this[e]?[4,this[e](t)]:[3,2];case 1:return n=o.sent(),(0,i.kg)(2,"address",n),this.saveConnections(),this.emitSavedConnection(n),[2,n];case 2:throw new Error("Wallet type not found")}}))}))},e.prototype.signMessage=function(e,t){return s(this,void 0,void 0,(function(){var n;return c(this,(function(o){switch(o.label){case 0:return n=this.getWalletProvider(e),[4,n.getSigner(e).signMessage(t)];case 1:return[2,o.sent()]}}))}))},e.prototype.getWalletProvider=function(e){var t;if(e=e.toLowerCase(),!(null===(t=this.connections[e])||void 0===t?void 0:t.provider))throw new Error("Wallet provider not found for address");return this.connections[e].provider},e.prototype.getConnectedWalletData=function(){return Object.values(this.connections)},e.prototype.registerNewWalletAddress=function(e,t,n,r,i){return void 0===i&&(i="evm"),this.connections[e.toLowerCase()]={address:e,chainId:t,providerType:n,provider:r,blockchain:i,ethers:o},e},e.prototype.registerProvider=function(e,t){return s(this,void 0,void 0,(function(){var n,o,r,i=this;return c(this,(function(s){switch(s.label){case 0:return[4,e.listAccounts()];case 1:return n=s.sent(),[4,e.detectNetwork()];case 2:if(o=s.sent().chainId,0===n.length)throw new Error("No accounts found via wallet-connect.");return r=n[0],this.registerNewWalletAddress(r,o,t,e),e.provider.on("accountsChanged",(function(n){r!==n[0]&&(delete i.connections[r.toLowerCase()],r=n[0],i.registerNewWalletAddress(r,o,t,e),i.saveConnections(),i.emitSavedConnection(r),i.client.getTokenStore().clearCachedTokens(),i.client.enrichTokenLookupDataOnChainTokens())})),e.provider.on("chainChanged",(function(o){i.registerNewWalletAddress(n[0],o,t,e),i.saveConnections(),i.emitNetworkChange(o)})),[2,n[0]]}}))}))},e.prototype.MetaMask=function(e){return s(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return(0,i.kg)(2,"connect MetaMask"),void 0===window.ethereum?[3,2]:[4,window.ethereum.enable()];case 1:return t.sent(),e=new r.Q(window.ethereum),[2,this.registerProvider(e,"MetaMask")];case 2:throw new Error("MetaMask is not available. Please check the extension is supported and active.")}}))}))},e.prototype.WalletConnect=function(e){return s(this,void 0,void 0,(function(){var t,o=this;return c(this,(function(s){switch(s.label){case 0:return(0,i.kg)(2,"connect Wallet Connect"),[4,Promise.all([n.e(380),n.e(363),n.e(392)]).then(n.bind(n,39623))];case 1:return[4,s.sent().getWalletConnectProviderInstance(e)];case 2:return t=s.sent(),[2,new Promise((function(n,i){e&&t.connector.on("display_uri",(function(e,t){i(new Error("Connection expired"))})),t.enable().then((function(){var e=new r.Q(t);n(o.registerProvider(e,"WalletConnect"))})).catch((function(e){return i(e)}))}))]}}))}))},e.prototype.Torus=function(e){return s(this,void 0,void 0,(function(){var e,t;return c(this,(function(o){switch(o.label){case 0:return[4,Promise.all([n.e(380),n.e(443),n.e(811)]).then(n.bind(n,75730))];case 1:return[4,o.sent().getTorusProviderInstance()];case 2:return[4,(e=o.sent()).init()];case 3:return o.sent(),[4,e.login()];case 4:return o.sent(),t=new r.Q(e.provider),[2,this.registerProvider(t,"Torus")]}}))}))},e.prototype.Phantom=function(){return s(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return(0,i.kg)(2,"connect Phantom"),void 0===window.solana?[3,2]:[4,window.solana.connect()];case 1:return e=n.sent(),t=e.publicKey.toBase58(),[2,this.registerNewWalletAddress(t,"mainnet-beta","phantom",window.solana,"solana")];case 2:throw new Error("MetaMask is not available. Please check the extension is supported and active.")}}))}))},e.prototype.SafeConnect=function(){return s(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return(0,i.kg)(2,"connect SafeConnect"),[4,this.getSafeConnectProvider()];case 1:return[4,(e=n.sent()).initSafeConnect()];case 2:return t=n.sent(),this.registerNewWalletAddress(t,1,"SafeConnect",e),[2,t]}}))}))},e.prototype.safeConnectAvailable=function(){return void 0!==this.safeConnectOptions},e.prototype.getSafeConnectProvider=function(){return s(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return[4,Promise.resolve().then(n.bind(n,951))];case 1:return[2,new(0,e.sent().SafeConnectProvider)(this.client.getUi(),this.safeConnectOptions)]}}))}))},e.LOCAL_STORAGE_KEY="tn-wallet-connections",e}();const u=a}}]);