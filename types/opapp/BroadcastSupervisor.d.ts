/// <reference path="../AVComponent.d.ts" />
/// <reference path="../AVComponentCollection.d.ts" />

declare namespace OpApp {

    /* enums */
    export const enum PlayState  {
        UNREALIZED = 0,
        CONNECTING = 1,
        PRESENTING = 2,
        STOPPED = 3,
    }

    export type PlayStateError = ChannelChangeErrorState;

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

    export interface ChannelChangeEvent extends OIPF.ChannelChangeEvent {
        quiet?: number;
        viewerChannel?: OIPF.Channel;
    }
    export type ChannelChangeEventListener = (event: OpApp.ChannelChangeEvent) => void;

    export const enum AVComponentType {
        COMPONENT_TYPE_VIDEO = 0,
        COMPONENT_TYPE_AUDIO = 1,
        COMPONENT_TYPE_SUBTITLE = 2,
    }

    export const enum SeekReferencePoint {
        POSITION_CURRENT = 0,
        POSITION_START = 1,
        POSITION_END = 2
    }

    export type ChannelChangeErrorCallback = (channel: OIPF.Channel, errorState: ChannelChangeErrorState) => void;
    export type ChannelChangeSucceededCallback = (channel: OIPF.Channel, viewerChannel: OIPF.Channel, quiet: number) => void;
    export type ParentalRatingChangeCallback = (contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string, blocked: boolean) => void;
    export type ParentalRatingErrorCallback = (contentId: string, ratings: OIPF.ParentalRating[], DRMSystemId: string) => void;
    export type PlayStateChangeCallback = (state: PlayState, error: PlayStateError) => void;
    export type PlayPositionChangeCallback = (position: number) => void;
    export type PlaySpeedChangeCallback = (speed: number) => void;
    export type ProgrammesChangedCallback = () => void;
    export type SelectedComponentChangedCallback = (componentType: number) => void;



    /**
     * BroadcastSupervisor
     *
     * @see A2.5
     */
    export class BroadcastSupervisor {
        readonly type: 'broadcast/supervisor';
        /* Properties */
        readonly playState: PlayState;
        readonly playStateError: PlayStateError;
        readonly playSpeed: OpApp.VideoBroadcastObject["playSpeed"];
        readonly playPosition: OpApp.VideoBroadcastObject["playPosition"];
        readonly playbackOffset: OpApp.VideoBroadcastObject["playbackOffset"];
        readonly maxOffset: OpApp.VideoBroadcastObject["maxOffset"];
        readonly timeShiftMode: OpApp.VideoBroadcastObject["timeShiftMode"];
        readonly currentTimeShiftMode: OpApp.VideoBroadcastObject["currentTimeShiftMode"];
        readonly programmes: OpApp.VideoBroadcastObject["programmes"];
        readonly currentChannel: OpApp.VideoBroadcastObject["currentChannel"]; 

        /* Callbacks */
        onChannelChangeError?: ChannelChangeErrorCallback | null;
        onChannelChangeSucceeded?: ChannelChangeSucceededCallback | null;
        onParentalRatingChange?: ParentalRatingChangeCallback | null;
        onParentalRatingError?: ParentalRatingErrorCallback | null;
        onPlayPositionChanged?: PlayPositionChangeCallback | null;
        onPlaySpeedChanged?: PlaySpeedChangeCallback | null;
        onPlayStateChange?: PlayStateChangeCallback | null;
        onProgrammesChanged?: ProgrammesChangedCallback | null;
        onSelectedComponentChanged?: SelectedComponentChangedCallback | null;
        // TODO channel change events are different for opapps - will have quiet/viewerChannel props
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ChannelChangeSucceeded, listener: (event: OpApp.ChannelChangeEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ChannelChangeError, listener: (event: OIPF.ChannelChangeEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlayStateChange, listener: (event: OIPF.PlayStateChangeEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlaySpeedChanged, listener: (event: OIPF.PlaySpeedChangedEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlayPositionChanged, listener: (event: OIPF.PlayPositionChangedEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ParentalRatingChange, listener: (event: OIPF.ParentalRatingChangeEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ParentalRatingError, listener: (event: OIPF.ParentalRatingErrorEvent) => void): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ProgrammesChanged, listener: EventListener): void;
        addEventListener(eventName: OIPF.VideoBroadcastObjectEvents.SelectedComponentChanged, listener: (event: OIPF.SelectedComponentChangeEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ChannelChangeSucceeded, listener: (event: OIPF.ChannelChangeEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ChannelChangeError, listener: (event: OIPF.ChannelChangeEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlayStateChange, listener: (event: OIPF.PlayStateChangeEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlaySpeedChanged, listener: (event: OIPF.PlaySpeedChangedEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.PlayPositionChanged, listener: (event: OIPF.PlayPositionChangedEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ParentalRatingChange, listener: (event: OIPF.ParentalRatingChangeEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ParentalRatingError, listener: (event: OIPF.ParentalRatingErrorEvent) => void): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.ProgrammesChanged, listener: EventListener): void;
        removeEventListener(eventName: OIPF.VideoBroadcastObjectEvents.SelectedComponentChanged, listener: (event: OIPF.SelectedComponentChangeEvent) => void): void;

        getChannelConfig(): OIPF.ChannelConfig;

        createChannelObject(idType: number, dsd: string, sid: number): OIPF.Channel;

        createChannelObject(idType: number, onid?: number, tsid?: number, sid?: number, sourceId?: number, ipBroadcastID?: string): OIPF.Channel;

        setChannel(channel: OIPF.Channel, trickplay?: boolean, contentAccessDescriptorURL?: string): void;

        setChannel(channel: OIPF.Channel, trickplay?: boolean, contentAccessDescriptorURL?: string, quiet?: number, blockAV?: boolean): void;

        prevChannel(blockAV?: boolean): void;

        nextChannel(blockAV?: boolean): void;

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
