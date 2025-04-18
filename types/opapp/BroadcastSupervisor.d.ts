/// <reference path="../AVComponent.d.ts" />
/// <reference path="../AVComponentCollection.d.ts" />

import VideoBroadcastObject = OIPF.VideoBroadcastObject;

declare namespace OpApp {

    /* enums */
    export const enum playState  {
        UNREALIZED = 0,
        CONNECTING = 1,
        PRESENTING = 2,
        STOPPED = 3,
    }

    export type playStateError = ChannelChangeErrorState;

    export const enum ChannelChangeErrorState {
        CHANNEL_NOT_SUPPORTED = 0,
        CANNOT_TUNE = 1,
        TUNER_LOCKED = 2,
        PARENTAL_LOCK_CHANNEL_SIGNAL = 3,
        ENCRYPTED_CHANNEL_KEY_MODULE_MISSING = 4,
        UNKNOWN_CHANNEL = 5,
        CHANNEL_SWITCH_INTERUPTED = 6,
        CHANNEL_CHANGE_FAILED_RECORDED = 7,
        CANNOT_RESOLVE_URI_IP_CHANNEL = 8,
        INSUFFICIENT_BANDWIDTH = 9,
        CHANNEL_CHANGE_FAILED_NO_CHANNEL_LIST_UNREALIZED = 10,
        INSUFFICIENT_RESOURCES = 11,
        CHANNEL_NOT_FOUND = 12,
        PARENTAL_LOCK_CHANNEL_MANUAL = 13,
        UNIDENTIFIED_ERROR = 100,
    }

    export const enum AVComponentType {
        COMPONENT_TYPE_VIDEO = 0,
        COMPONENT_TYPE_AUDIO = 1,
        COMPONENT_TYPE_SUBTITLE = 2,
    }

    export const enum SEEK_REFERENCE_POINT {
        POSITION_CURRENT = 0,
        POSITION_START = 1,
        POSITION_END = 2
    }

    export const enum BroadcastSupervisorEvents {
        ChannelChangeSucceeded = "ChannelChangeSucceeded",
        ChannelChangeError = "ChannelChangeError",
        PlayStateChange = "PlayStateChange",
        PlaySpeedChanged = "PlaySpeedChanged",
        PlayPositionChanged = "PlayPositionChanged",
        ProgrammesChanged = "ProgrammesChanged",
        ParentalRatingChange = "ParentalRatingChange",
        ParentalRatingError = "ParentalRatingError",
        SelectedComponentChanged = "SelectedComponentChanged"
    }

    export interface ChannelChangeEvent extends Event {
        channel: OIPF.Channel;
        errorState?: number;
    }
    export interface PlayStateChangeEvent extends Event {
        state: number;
        error?: number;
    }

    export interface PlaySpeedChangedEvent extends Event {
        speed: number;
    }

    export interface PlayPositionChangedEvent extends Event {
        position: number;
    }

    export interface ParentalRatingChangeEvent extends Event {
        contentID: string;
        ratings: OIPF.Collection<OIPF.ParentalRating>;
        DRMSystemID: string;
        blocked: boolean;
    }
    
    export interface SelectedComponentChangeEvent extends Event {
        componentType: number;
    }

    export type ParentalRatingErrorEvent = Omit<OpApp.ParentalRatingChangeEvent, 'blocked'>;

    /**
     * BroadcastSupervisor
     *
     * @see A2.5
     */
    export class BroadcastSupervisor {
        /* Properties */
        readonly playState: playState;
        readonly playStateError: playStateError;
        readonly playSpeed: OpApp.VideoBroadcastObject["playSpeed"];
        readonly playPosition: OpApp.VideoBroadcastObject["playPosition"];
        readonly playbackOffset: OpApp.VideoBroadcastObject["playbackOffset"];
        readonly maxOffset: OpApp.VideoBroadcastObject["maxOffset"];
        readonly timeShiftMode: OpApp.VideoBroadcastObject["timeShiftMode"];
        readonly currentTimeShiftMode: OpApp.VideoBroadcastObject["currentTimeShiftMode"];
        readonly programmes: OpApp.VideoBroadcastObject["programmes"];
        readonly currentChannel: OpApp.VideoBroadcastObject["currentChannel"]; 

        /* Callbacks */
        onChannelChangeError(channel: OIPF.Channel, errorState: ChannelChangeErrorState): void;
        onPlayStateChange(state: playState, error: ChannelChangeErrorState): void;
        onChannelChangeSucceeded: (channel: OIPF.Channel) => void;
        onPlaySpeedChanged(speed: number): void;
        onPlayPositionChanged(position: number): void;
        onProgrammesChanged(): void;
        onParentalRatingChange(contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string, blocked: boolean): void;
        onParentalRatingError(contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string): void;
        onSelectedComponentChanged(componentType: number): void;

        addEventListener(eventName: BroadcastSupervisorEvents.ChannelChangeSucceeded, listener: (event: ChannelChangeEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.PlayStateChange, listener: (event: PlayStateChangeEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.PlaySpeedChanged, listener: (event: PlaySpeedChangedEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.PlayPositionChanged, listener: (event: PlayPositionChangedEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.ParentalRatingChange, listener: (event: ParentalRatingChangeEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.ParentalRatingError, listener: (event: ParentalRatingErrorEvent) => void): void;
        addEventListener(eventName: BroadcastSupervisorEvents.SelectedComponentChanged, listener: (event: SelectedComponentChangeEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.ChannelChangeSucceeded, listener: (event: ChannelChangeEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.PlayStateChange, listener: (event: PlayStateChangeEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.PlaySpeedChanged, listener: (event: PlaySpeedChangedEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.PlayPositionChanged, listener: (event: PlayPositionChangedEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.ParentalRatingChange, listener: (event: ParentalRatingChangeEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.ParentalRatingError, listener: (event: ParentalRatingErrorEvent) => void): void;
        removeEventListener(eventName: BroadcastSupervisorEvents.SelectedComponentChanged, listener: (event: SelectedComponentChangeEvent) => void): void;

        getChannelConfig(): Pick<VideoBroadcastObject, "getChannelConfig">;

        createChannelObject(
            idType: number,
            dsd: string,
            sid: number,
        ): Pick<VideoBroadcastObject, "createChannelObject">;

        createChannelObject(
            idType: number,
            onid?: number,
            tsid?: number,
            sid?: number,
            sourceId?: number,
            ipBroadcastID?: string
        ): Pick<VideoBroadcastObject, "createChannelObject">;

        setChannel(
            channel: OIPF.Channel,
            trickplay?: boolean,
            // tslint:disable-next-line:unified-signatures
            contentAccessDescriptorURL?: string,
        ): Pick<VideoBroadcastObject, "setChannel">;

        setChannel(
            channel: OIPF.Channel,
            trickplay?: boolean,
            contentAccessDescriptorURL?: string,
            quiet?: number,
            // tslint:disable-next-line:unified-signatures
            blockAV?: boolean,
        ): Pick<VideoBroadcastObject, "setChannel">;

        setChannel(
            channel?: OIPF.Channel,
        ): Pick<VideoBroadcastObject, "setChannel">;

        prevChannel(blockAV?: boolean): Pick<VideoBroadcastObject, "prevChannel">;

        nextChannel(blockAV?: boolean): Pick<VideoBroadcastObject, "nextChannel">;

        recordNow(duration: number): string | null | undefined;
        stopRecording(): void;
        pause(): void;
        resume(): void;
        setSpeed(speed: number): boolean;
        seek(offset: number, reference: number): boolean;

        blockAV(): void;
        unblockAV(): void;

        getCurrentActiveComponents(componentType?: AVComponentType): OIPF.AVComponentCollection;
        getComponents(componentType?: AVComponentType): OIPF.AVComponentCollection;

        stopTimeshift(): boolean;
        selectComponent(componentType: AVComponentType | OIPF.AVComponent): void;
        unselectComponent(componentType: AVComponentType | OIPF.AVComponent): void;
    }
}
