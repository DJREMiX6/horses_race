import Horse from "./Horse.js";

export type HorseEventListener = (sender: Horse) => void;
export type HorsesManagerEvent = "horsesStarted" | "horsesEnded" | "horseStarted" | "horseEnded" | "horsesStopped" | "horseStopped";
export type HorsesManagerEventArgs = Horse | undefined;
export type HorsesManagerEventListener = (event: HorsesManagerEventArgs) => void;
export type HorsesManagerListenerObject = {eventName: HorsesManagerEvent, listener: HorsesManagerEventListener};