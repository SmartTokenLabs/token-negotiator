"use strict";(self.webpackChunknegotiator=self.webpackChunknegotiator||[]).push([[827],{18827:(e,t,n)=>{n.r(t),n.d(t,{Web3WalletProvider:()=>c,default:()=>a});var r=n(241),o=n(93951),s=function(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function c(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}a((r=r.apply(e,t||[])).next())}))},i=function(e,t){var n,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function c(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},c=function(){function e(){this.state={addresses:[]}}return e.prototype.connectWith=function(e){return s(this,void 0,void 0,(function(){var t;return i(this,(function(n){switch(n.label){case 0:if(!e)throw new Error("Please provide a Wallet type to connect with.");return this[e]?[4,this[e]()]:[3,2];case 1:return t=n.sent(),(0,o.kg)(2,"address",t),[2,t];case 2:throw new Error("Wallet type not found")}}))}))},e.prototype.signWith=function(e,t){return s(this,void 0,void 0,(function(){var n;return i(this,(function(o){switch(o.label){case 0:return n=new r.Q(t.provider),[4,n.getSigner().signMessage(e)];case 1:return[2,o.sent()]}}))}))},e.prototype.getConnectedWalletData=function(){return this.state.addresses},e.prototype.registerNewWalletAddress=function(e,t,n){return this.state.addresses.push({address:e,chainId:t,provider:n}),this.state.addresses},e.prototype.getWeb3ChainId=function(e){return s(this,void 0,void 0,(function(){return i(this,(function(t){return[2,e.eth.getChainId()]}))}))},e.prototype.getWeb3Accounts=function(e){return s(this,void 0,void 0,(function(){return i(this,(function(t){return[2,e.eth.getAccounts()]}))}))},e.prototype.getWeb3ChainIdAndAccounts=function(e){return s(this,void 0,void 0,(function(){var t,n;return i(this,(function(r){switch(r.label){case 0:return[4,this.getWeb3ChainId(e)];case 1:return t=r.sent(),[4,this.getWeb3Accounts(e)];case 2:return n=r.sent(),[2,{chainId:t,accounts:n}]}}))}))},e.prototype.MetaMask=function(){return s(this,void 0,void 0,(function(){var e,t,n;return i(this,(function(r){switch(r.label){case 0:return(0,o.kg)(2,"connect MetaMask"),void 0===window.ethereum?[3,3]:[4,window.ethereum.request({method:"eth_requestAccounts"})];case 1:return e=r.sent(),[4,window.ethereum.request({method:"eth_chainId"})];case 2:return t=r.sent(),n=e[0],[2,this.registerNewWalletAddress(n,parseInt(t,16),ethereum)];case 3:throw new Error("MetaMask is not available. Please check the extension is supported and active.")}}))}))},e.prototype.WalletConnect=function(){return s(this,void 0,void 0,(function(){var e,t;return i(this,(function(s){switch(s.label){case 0:return(0,o.kg)(2,"connect Wallet Connect"),[4,Promise.all([n.e(380),n.e(363),n.e(392)]).then(n.bind(n,39623))];case 1:return[4,s.sent().getWalletConnectProviderInstance()];case 2:return[4,(e=s.sent()).enable()];case 3:return s.sent(),[4,new r.Q(e).listAccounts()];case 4:if(0===(t=s.sent()).length)throw new Error("No accounts found via wallet-connect.");return[2,this.registerNewWalletAddress(t[0],"1",e)]}}))}))},e.prototype.Torus=function(){return s(this,void 0,void 0,(function(){var e,t,o,s,c;return i(this,(function(i){switch(i.label){case 0:return[4,Promise.all([n.e(380),n.e(566),n.e(412)]).then(n.bind(n,75730))];case 1:return[4,i.sent().getTorusProviderInstance()];case 2:return[4,(e=i.sent()).init()];case 3:return i.sent(),[4,e.login()];case 4:return i.sent(),t=new r.Q(e.provider),[4,this.getWeb3ChainIdAndAccounts(t)];case 5:return o=i.sent(),s=o.accounts,c=o.chainId,[2,this.registerNewWalletAddress(s[0],c,e.provider)]}}))}))},e}();const a=c}}]);