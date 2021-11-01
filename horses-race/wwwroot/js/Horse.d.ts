import { HorseEventListener } from "./Events.js";
export default class Horse {
    private _horseName;
    private _horseMaxLength;
    private _horseActualLength;
    private _horseStepListeners;
    private _horseFinishedListeners;
    private _intervalId;
    private _isRunning;
    constructor(name: string, maxLength: number);
    getHorseName(): string;
    setHroseName(name: string): void;
    getHorseMaxLength(): number;
    setHorseMaxLength(maxLength: number): void;
    getHorseActualLength(): number;
    setHorseActualLength(actualLength: number): void;
    run(interval: number): void;
    stop(): void;
    addEventListener(eventName: string, listener: HorseEventListener): void;
    removeEventListener(eventName: string, listener: HorseEventListener): void;
    private onHorseStep;
    private onHorseFinished;
    get isRunning(): boolean;
}
