declare class OutletService {
    constructor();
    eventReciever: (data: any) => void;
    eventSender: {
        emitTokens: (tokenProof: any) => void;
    };
}
export default OutletService;
