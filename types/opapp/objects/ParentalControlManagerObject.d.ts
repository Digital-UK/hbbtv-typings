declare namespace OpApp {

    export interface ParentalControlManagerObject extends Omit<OIPF.ParentalControlManagerObject, 'unlockWithParentalControlPIN'> {
        readonly parentalPINLength: number;
        requestParentalControlApproval(context: any): Promise<string>;
        unlockWithParentalControlPIN(pcPIN: string, target: VideoBroadcastObject | OpApp.BroadcastSupervisor | HTMLMediaElement): OIPF.PINControlStatus | 3;
    }

}
