declare namespace OIPF {

    export const enum PINControlStatus {
        CORRECT_PIN = 0,
        INCORRECT_PIN = 1,
        LOCKED = 2,
    }

    export const enum VerifyParentalControlStatus {
        APPROVED = "approved",
        NOT_APPROVED = "notApproved",
    }

    export interface ParentalControlManagerObject extends HTMLObjectElement {
        type: 'application/oipfParentalControlManager';
        parentalRatingSchemes: OIPF.Collection<OIPF.ParentalRatingScheme>;
        isPINEntryLocked: boolean;
        setParentalControlStatus(pcPIN: string, enable: boolean): OIPF.PINControlStatus;
        getParentalControlStatus(): boolean;
        getBlockUnrated(): boolean;
        setParentalControlPIN(oldPIN: string, newPIN: string): OIPF.PINControlStatus;
        unlockWithParentalControlPIN(pcPIN: string, target: OIPF.VideoBroadcastObject | HTMLMediaElement): OIPF.PINControlStatus | 3;
        verifyParentalControlPIN(pcPIN: string): OIPF.PINControlStatus;
        setBlockUnrated(pin: RTCSignalingState, blockUnrated: boolean): OIPF.PINControlStatus;
    }

}
