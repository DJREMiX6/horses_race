import Horse from "./Horse.js";
export declare type HorseEventListener = (sender: Horse) => void;
export declare type HorsesManagerEvent = "horsesStarted" | "horsesEnded" | "horseStarted" | "horseEnded" | "horsesStopped" | "horseStopped";
export declare type HorsesManagerEventArgs = Horse | undefined;
export declare type HorsesManagerEventListener = (event: HorsesManagerEventArgs) => void;
export declare type HorsesManagerListenerObject = {
    eventName: HorsesManagerEvent;
    listener: HorsesManagerEventListener;
};
