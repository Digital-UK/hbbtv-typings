declare namespace OIPF {

    export const enum SearchManagerEvents {
        MetadataSearch = 'MetadataSearch',
        MetadataUpdate = 'MetadataUpdate',
    }

    export interface MetadataUpdateEvent extends Event {
        action: number;
        info: number;
        object: any;
    }
    export type MetadataUpdateEventListener = (event: MetadataUpdateEvent) => void;
    
    export interface MetadataSearchEvent extends Event {
        search: OIPF.MetadataSearch;
        state: number;
    }
    export type MetadataSearchEventListener = (event: MetadataSearchEvent) => void;

    export interface SearchResults {
        readonly length: number;
        readonly offset: number;
        readonly totalSize: number;
        item(index: number): any;
        getResults(offset: number, count: number): boolean;
        abort(): void;
    }

    export interface Query {
        and(query: OIPF.Query): OIPF.Query;
        or(query: OIPF.Query): OIPF.Query;
        not(): OIPF.Query;
    }

    export interface MetadataSearch {
        readonly searchTarget: number;
        readonly result: OIPF.SearchResults;

        setQuery(query: Query): void;
        addRatingConstraint(scheme: OIPF.ParentalRatingScheme, threshold: number): void;
        addCurrentRatingConstraint(): void;
        addChannelConstraint(channelList: OIPF.ChannelList): void;
        addChannelConstraint(channel: OIPF.Channel): void;
        orderBy(field: string, ascending: boolean): void;
        createQuery(field: string, comparison: number, value: string): OIPF.Query;
        findProgrammesFromStream(channel: OIPF.Channel, startTime: number | null, count?: number): void;
    }

    export interface SearchManagerObject extends HTMLObjectElement {
        type: 'application/oipfSearchManager';
        readonly guideDaysAvailable: number;
        onMetadataUpdate?: (action: number, info: number, object: any) => void;
        onMetadataSearch?: (search: OIPF.MetadataSearch, state: number) => void;

        createSearch(searchTarget: number): OIPF.MetadataSearch;
        getChannelConfig(): OIPF.ChannelConfig;

        addEventListener(type: OIPF.SearchManagerEvents.MetadataSearch, listener: MetadataSearchEventListener): void;
        removeEventListener(type: OIPF.SearchManagerEvents.MetadataSearch, listener: MetadataSearchEventListener): void;
        addEventListener(type: OIPF.SearchManagerEvents.MetadataUpdate, listener: MetadataUpdateEventListener): void;
        removeEventListener(type: OIPF.SearchManagerEvents.MetadataUpdate, listener: MetadataUpdateEventListener): void;
    }

}
