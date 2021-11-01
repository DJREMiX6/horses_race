import Horse from "./Horse.js";
import { HorsesManagerEvent, HorsesManagerEventListener } from "./Events.js";
export default class HorsesManager {
    private _horses;
    private _horsesContainer;
    private _horsesRunning;
    private _eventsListeners;
    constructor(horsesContainer: HTMLDivElement);
    get horsesCount(): number;
    addEventListener(eventName: HorsesManagerEvent, listener: HorsesManagerEventListener): void;
    removeEventListener(eventName: HorsesManagerEvent, listener: HorsesManagerEventListener): void;
    startHorses(): void;
    stopHorses(): void;
    horsesRunning(): boolean;
    addHorses(...horses: Horse[]): void;
    reset(): void;
    updateGraphics(): void;
    restart(): void;
    private createElements;
    private onEvent;
    private onHorseFinished;
}
