import Horse from "./Horse.js";
import {    HorsesManagerEvent, 
            HorsesManagerEventListener, 
            HorsesManagerListenerObject, 
            HorsesManagerEventArgs 
        } from "./Events.js";

const INTERVAL: number = 60;

export default class HorsesManager {
    private _horses: Horse[];
    private _horsesContainer: HTMLDivElement;
    private _horsesRunning: boolean;
    private _eventsListeners: HorsesManagerListenerObject[];

    public constructor(horsesContainer: HTMLDivElement) {
        this._horsesContainer = horsesContainer;
        this._horses = [];
        this._horsesRunning = false;
        this._eventsListeners = [];
        this.updateGraphics();
    }

    //PUBLIC PROPS

    public get horsesCount(): number {
        return this._horses.length;
    }

    // PUBLIC METHODS

    public addEventListener(eventName: HorsesManagerEvent, listener: HorsesManagerEventListener) {
        this._eventsListeners.push({eventName, listener});
    }

    public removeEventListener(eventName: HorsesManagerEvent, listener: HorsesManagerEventListener) {
        let listListener = this._eventsListeners.find(obj => obj.eventName === eventName && obj.listener === listener);
        if(listListener) {
            this._eventsListeners.splice(this._eventsListeners.indexOf(listListener));
        }
    }

    public startHorses(): void {
        this.restart();
        for(let horse of this._horses) {
            horse.run(INTERVAL);
            this.onEvent("horseStarted", horse);
        }
        this._horsesRunning = true;
        this.onEvent("horsesStarted", undefined);
    }

    public stopHorses(): void {
        for(let horse of this._horses) {
            horse.stop();
            this.onEvent("horseStopped", horse);
        }
        this._horsesRunning = false;
        this.onEvent("horsesStopped", undefined);
    }

    public horsesRunning(): boolean {
        return this._horsesRunning;
    }

    public addHorses(...horses: Horse[]): void {
        this._horses.push(...horses);
        this.updateGraphics();
    }

    public reset(): void {
        this.stopHorses();
        this._horses = [];
        this.updateGraphics();
    }

    public updateGraphics(): void {
        this._horsesContainer.innerHTML = "";
        this.createElements();
    }

    public restart(): void {
        this._horses.forEach(horse => {
            horse.setHorseActualLength(0);
            this.updateGraphics();
        });
    }

    // PRIVATE METHODS

    private createElements() {
        this._horses.forEach((horse) => {
            let horseContainer = document.createElement("div");
            horseContainer.classList.add("row", "border", "border-dark", "mb-2");

            let labelColumn = document.createElement("div");
            labelColumn.classList.add("col-2");

            let label = document.createElement("label");
            label.innerText = horse.getHorseName();
            labelColumn.appendChild(label);
            horseContainer.appendChild(labelColumn);

            let progressColumn = document.createElement("div");
            progressColumn.classList.add("col-10");

            let progressContainer = document.createElement("div");
            progressContainer.classList.add("progress", "mt-1");

            let progress = document.createElement("div");
            progress.classList.add("progress-bar");
            progress.setAttribute("role", "progressbar");
            progress.setAttribute("aria-value-now", horse.getHorseActualLength().toString());
            progress.setAttribute("aria-value-min", "0");
            progress.setAttribute("aria-value-max", horse.getHorseMaxLength().toString());
            progressContainer.appendChild(progress);
            progressColumn.appendChild(progressContainer);
            horseContainer.appendChild(progressColumn);
            this._horsesContainer.appendChild(horseContainer);

            horse.addEventListener("horseStep", (horse: Horse) => {
                progress.setAttribute("aria-value-now", horse.getHorseActualLength().toString());
                progress.setAttribute("style", "width: " + ((horse.getHorseActualLength() * 100) / horse.getHorseMaxLength()) + "%");
                progress.innerText = horse.getHorseActualLength().toString();
            });
            horse.addEventListener("horseFinished", (horse: Horse) => {
                progress.classList.add("bg-success");
                this.onHorseFinished(horse);
            })
        });
    }

    private onEvent(eventName: HorsesManagerEvent, eventArgs: HorsesManagerEventArgs) {
        this._eventsListeners.filter(event => event.eventName === eventName).forEach(event => {
            event.listener(eventArgs);
        });
    }

    private onHorseFinished(horse: Horse) {
        this.onEvent("horseEnded", horse);
        if(this._horses.every(horse => horse.isRunning === false)) {
            this._horsesRunning = false;
            this.onEvent("horsesEnded", undefined);
        } else {
            this._horsesRunning = true;
        }
    }
}