import { HorseEventListener } from "./Events.js";

const EVENTS_NAMES: string[] = ["horseStep", "horseFinished"];

export default class Horse {
    private _horseName: string;
    private _horseMaxLength: number;
    private _horseActualLength: number;
    private _horseStepListeners: HorseEventListener[];
    private _horseFinishedListeners: HorseEventListener[];
    private _intervalId: number;
    private _isRunning: boolean;

    public constructor(name: string, maxLength: number) {
        this._horseName = name;
        this._horseMaxLength = maxLength;
        this._horseActualLength = 0;
        this._horseStepListeners = [];
        this._horseFinishedListeners = [];
        this._intervalId = -1;
        this._isRunning = false;
    }

    public getHorseName(): string {
        return this._horseName;
    }

    public setHroseName(name: string): void {
        this._horseName = name;
    }

    public getHorseMaxLength(): number {
        return this._horseMaxLength;
    }

    public setHorseMaxLength(maxLength: number): void {
        this._horseMaxLength = maxLength;
    }

    public getHorseActualLength(): number {
        return this._horseActualLength;
    }

    public setHorseActualLength(actualLength: number): void {
        this._horseActualLength = actualLength;
    }

    public run(interval: number): void {
        this._isRunning = true;
        this._intervalId = setInterval(() => {
            this._horseActualLength ++;
            console.log("Horse step " + this.getHorseName() + " " + this.getHorseActualLength());
            this.onHorseStep();
            if(this._horseActualLength >= this._horseMaxLength) {
                this.stop();
            }
        }, interval);
    }

    public stop(): void {
        if(this._intervalId !== -1) {
            clearInterval(this._intervalId);
            this._isRunning = false;
            this.onHorseFinished();
        }
    }

    public addEventListener(eventName: string, listener: HorseEventListener) {
        switch(eventName) {
            case EVENTS_NAMES[0]: //horseStep
                this._horseStepListeners.push(listener);
                break;
            case EVENTS_NAMES[1]: //horseFinished
                this._horseFinishedListeners.push(listener);
                break;
            default: //Error
                throw new Error("Event name '" + eventName + "' does not exist!")
                break;
        }
    }

    public removeEventListener(eventName: string, listener: HorseEventListener) {
        switch(eventName) {
            case EVENTS_NAMES[0]: //horseStep
                this._horseStepListeners.splice(this._horseStepListeners.indexOf(listener), 1);
                break;
            case EVENTS_NAMES[1]: //horseFinished
                this._horseFinishedListeners.splice(this._horseFinishedListeners.indexOf(listener), 1);
                break;
            default: //Error
                throw new Error("Event name '" + eventName + "' does not exist!")
                break;
        }
    }

    private onHorseStep(): void {
        this._horseStepListeners.forEach(listener => {
            listener(this);
        });
    }

    private onHorseFinished(): void {
        this._horseFinishedListeners.forEach(listener => {
            listener(this);
        });
    }

    public get isRunning(): boolean {
        return this._isRunning;
    }
}