
// OutletService enscapsulates resources to use the negotiator service (outlet)
// - reads tokens from query string
// - provides tokens through an iframe

class OutletService {

  constructor() {};

  // recieves events
  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokens': break;
    }
  }

  // sends events
  eventSender = {
    emitTokens: () => {
      window.top.postMessage({
        evt: 'setTokens',
        tokens: []
      }, "*");
    }
  }

}

export default OutletService;
