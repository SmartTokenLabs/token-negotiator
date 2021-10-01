declare class OutletService {
    constructor();
    eventReciever: (data: any) => void;
    eventSender: {
        emitTokens: (tokens: any) => void;
    };
}
export default OutletService;
