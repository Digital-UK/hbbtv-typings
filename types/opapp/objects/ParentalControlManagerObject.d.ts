declare namespace OpApp {

    export interface ParentalControlManagerObject extends Omit<OIPF.ParentalControlManagerObject, 'unlockWithParentalControlPIN'> {
        readonly parentalPINLength: number;
        cancelParentalControlApproval(): void;
        requestParentalControlApproval(context: any, challengeUser?: boolean): Promise<string>;
        unlockWithParentalControlPIN(pcPIN: string, target: VideoBroadcastObject | OpApp.BroadcastSupervisor | HTMLMediaElement): OIPF.PINControlStatus | 3;
    }

}
