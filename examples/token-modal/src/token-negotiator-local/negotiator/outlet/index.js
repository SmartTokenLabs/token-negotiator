import { 
  storeMagicURL,
  readMagicUrl
} from './../negotiatorFunctions';

// TODO add annotations: usage.
export class Outlet {
  
  constructor() {
    // assign public proxied functions
    this.storeMagicURL = storeMagicURL;
    this.readMagicUrl = readMagicUrl;
  };

}

