// readMagicUrl() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const tokenFromQuery = urlParams.get(this.tokenUrlName);
//   const secretFromQuery = urlParams.get(this.tokenSecretName);
//   const idFromQuery = urlParams.get(this.tokenIdName);
//   if (!(tokenFromQuery && secretFromQuery)) return;
//   // Get the current Storage Tokens
//   let tokensOutput = this.readTokens();
//   let tokens = [];
//   let isNewQueryTicket = true;
//   if (!tokensOutput.noTokens) {
//     // Build new list of tickets from current and query ticket { ticket, secret }
//     tokens = tokensOutput.tokens;
//     tokens.map(tokenData => {
//       if (tokenData.token === tokenFromQuery) {
//         isNewQueryTicket = false;
//       }
//     });
//   }
//   if (isNewQueryTicket) {
//     tokens.push({
//       token: tokenFromQuery,
//       secret: secretFromQuery,
//       id: idFromQuery,
//       magic_link: window.location.href
//     }); // new raw object
//   }
//   // Set New tokens list raw only, websters will be decoded each time
//   storeMagicURL(tokens)
//   if (window !== window.parent) {
//     // send ready message to start interaction
//     let referrer = new URL(document.referrer);
//     window.parent.postMessage({ iframeCommand: "closeMe" }, referrer.origin);
//   }
// }

// storeMagicURL (tokens) {
//  localStorage.setItem(this.localStorageItemName, JSON.stringify(tokens));
// }