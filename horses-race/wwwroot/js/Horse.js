const EVENTS_NAMES = ["horseStep", "horseFinished"];
export default class Horse {
    constructor(name, maxLength) {
        this._horseName = name;
        this._horseMaxLength = maxLength;
        this._horseActualLength = 0;
        this._horseStepListeners = [];
        this._horseFinishedListeners = [];
        this._intervalId = -1;
        this._isRunning = false;
    }
    getHorseName() {
        return this._horseName;
    }
    setHroseName(name) {
        this._horseName = name;
    }
    getHorseMaxLength() {
        return this._horseMaxLength;
    }
    setHorseMaxLength(maxLength) {
        this._horseMaxLength = maxLength;
    }
    getHorseActualLength() {
        return this._horseActualLength;
    }
    setHorseActualLength(actualLength) {
        this._horseActualLength = actualLength;
    }
    run(interval) {
        this._isRunning = true;
        this._intervalId = setInterval(() => {
            this._horseActualLength++;
            console.log("Horse step " + this.getHorseName() + " " + this.getHorseActualLength());
            this.onHorseStep();
            if (this._horseActualLength >= this._horseMaxLength) {
                this.stop();
            }
        }, interval);
    }
    stop() {
        if (this._intervalId !== -1) {
            clearInterval(this._intervalId);
            this._isRunning = false;
            this.onHorseFinished();
        }
    }
    addEventListener(eventName, listener) {
        switch (eventName) {
            case EVENTS_NAMES[0]: //horseStep
                this._horseStepListeners.push(listener);
                break;
            case EVENTS_NAMES[1]: //horseFinished
                this._horseFinishedListeners.push(listener);
                break;
            default: //Error
                throw new Error("Event name '" + eventName + "' does not exist!");
                break;
        }
    }
    removeEventListener(eventName, listener) {
        switch (eventName) {
            case EVENTS_NAMES[0]: //horseStep
                this._horseStepListeners.splice(this._horseStepListeners.indexOf(listener), 1);
                break;
            case EVENTS_NAMES[1]: //horseFinished
                this._horseFinishedListeners.splice(this._horseFinishedListeners.indexOf(listener), 1);
                break;
            default: //Error
                throw new Error("Event name '" + eventName + "' does not exist!");
                break;
        }
    }
    onHorseStep() {
        this._horseStepListeners.forEach(listener => {
            listener(this);
        });
    }
    onHorseFinished() {
        this._horseFinishedListeners.forEach(listener => {
            listener(this);
        });
    }
    get isRunning() {
        return this._isRunning;
    }
}
