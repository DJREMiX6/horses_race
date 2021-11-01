const INTERVAL = 60;
export default class HorsesManager {
    constructor(horsesContainer) {
        this._horsesContainer = horsesContainer;
        this._horses = [];
        this._horsesRunning = false;
        this._eventsListeners = [];
        this.updateGraphics();
    }
    //PUBLIC PROPS
    get horsesCount() {
        return this._horses.length;
    }
    // PUBLIC METHODS
    addEventListener(eventName, listener) {
        this._eventsListeners.push({ eventName, listener });
    }
    removeEventListener(eventName, listener) {
        let listListener = this._eventsListeners.find(obj => obj.eventName === eventName && obj.listener === listener);
        if (listListener) {
            this._eventsListeners.splice(this._eventsListeners.indexOf(listListener));
        }
    }
    startHorses() {
        this.restart();
        for (let horse of this._horses) {
            horse.run(INTERVAL);
            this.onEvent("horseStarted", horse);
        }
        this._horsesRunning = true;
        this.onEvent("horsesStarted", undefined);
    }
    stopHorses() {
        for (let horse of this._horses) {
            horse.stop();
            this.onEvent("horseStopped", horse);
        }
        this._horsesRunning = false;
        this.onEvent("horsesStopped", undefined);
    }
    horsesRunning() {
        return this._horsesRunning;
    }
    addHorses(...horses) {
        this._horses.push(...horses);
        this.updateGraphics();
    }
    reset() {
        this.stopHorses();
        this._horses = [];
        this.updateGraphics();
    }
    updateGraphics() {
        this._horsesContainer.innerHTML = "";
        this.createElements();
    }
    restart() {
        this._horses.forEach(horse => {
            horse.setHorseActualLength(0);
            this.updateGraphics();
        });
    }
    // PRIVATE METHODS
    createElements() {
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
            horse.addEventListener("horseStep", (horse) => {
                progress.setAttribute("aria-value-now", horse.getHorseActualLength().toString());
                progress.setAttribute("style", "width: " + ((horse.getHorseActualLength() * 100) / horse.getHorseMaxLength()) + "%");
                progress.innerText = horse.getHorseActualLength().toString();
            });
            horse.addEventListener("horseFinished", (horse) => {
                progress.classList.add("bg-success");
                this.onHorseFinished(horse);
            });
        });
    }
    onEvent(eventName, eventArgs) {
        this._eventsListeners.filter(event => event.eventName === eventName).forEach(event => {
            event.listener(eventArgs);
        });
    }
    onHorseFinished(horse) {
        this.onEvent("horseEnded", horse);
        if (this._horses.every(horse => horse.isRunning === false)) {
            this._horsesRunning = false;
            this.onEvent("horsesEnded", undefined);
        }
        else {
            this._horsesRunning = true;
        }
    }
}
