// @ts-ignore
import { tokenConfig } from "./../tokenConfig";
import { getTokens } from './negotiatorFunctions';
import { createModalSkeleton, createToken, createFabButton } from "./componentFactory";

// NegotiatorService enscapsulates resources to use the negotiator service (modal)
// - html templates for modal and tokens
// - provides filtered tokens
// * proxy design pattern to expose public methods.

class NegotiatorService {

  // types
  getTokens: ({ filter, tokenName, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: { filter?: {}; tokenName?: string; tokensOrigin?: string; localStorageItemName?: string; tokenParser: any; unsignedTokenDataName: string; }) => Promise<unknown>;
  createModalSkeleton: () => string;
  createToken: (data: any, index: any) => string;
  createFabButton: (buttonURL: string) => string;
  config: any;
  selectedTokenState: any[]
  tokenParser: string;
  filter: {};
  options: {};

  constructor() {
    // assign (composed public/proxied) functions
    this.createModalSkeleton = createModalSkeleton;
    this.createToken = createToken;
    this.createFabButton = createFabButton;
    this.getTokens = getTokens;
    // initial selected token state
    this.selectedTokenState = [];
  };

  set configuration ({ filter, tokenName, options }) {
    this.filter = filter;
    this.options = options;
    this.config = tokenConfig[tokenName];
    this.tokenParser = this.config.tokenParser;
  }

  // manage selected token state (getter/setter)
  get selectedTokens() { return this.selectedTokenState };
  set selectedTokens(tokens) { this.selectedTokenState = tokens };

  // event sender / reciever
  // click handler
  // add tokens

}

export default NegotiatorService;
