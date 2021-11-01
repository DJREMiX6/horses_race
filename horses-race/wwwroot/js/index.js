import Horse from "./Horse.js";
import HorsesManager from "./HorsesManager.js";
const SUCCESS_CLASS_NAME = "btn-success";
const DANGER_CLASS_NAME = "btn-danger";
document.addEventListener("DOMContentLoaded", start);
function start() {
    //DOM ELEMENTS
    const horsesContainer = document.getElementById("HorsesContainer");
    const addButton = document.getElementById("AddButton");
    const clearButton = document.getElementById("ClearButton");
    const startStopButton = document.getElementById("StartStopButton");
    const horseNameInput = document.getElementById("NameInput");
    const horseDistanceInput = document.getElementById("DistanceInput");
    //VARS
    const hm = new HorsesManager(horsesContainer);
    //EVENTS HANDLERS
    const addHorses = () => {
        if (hm.horsesRunning()) {
            return;
        }
        if (horseNameInput.value != "" && horseDistanceInput.value != "") {
            hm.addHorses(new Horse(horseNameInput.value, Number.parseInt(horseDistanceInput.value)));
            horseNameInput.value = "";
            horseDistanceInput.value = "";
        }
    };
    const clearHorses = () => {
        hm.reset();
    };
    const startHorses = () => {
        if (hm.horsesCount > 0) {
            startStopButton.classList.replace(SUCCESS_CLASS_NAME, DANGER_CLASS_NAME);
            startStopButton.innerText = "Ferma";
            hm.startHorses();
        }
    };
    const stopHorses = () => {
        if (hm.horsesCount > 0) {
            startStopButton.classList.replace(DANGER_CLASS_NAME, SUCCESS_CLASS_NAME);
            startStopButton.innerText = "Avvia";
            hm.stopHorses();
        }
    };
    const onHorsesFinished = () => {
        startStopButton.classList.replace(DANGER_CLASS_NAME, SUCCESS_CLASS_NAME);
        startStopButton.innerText = "Avvia";
    };
    //EVENTS CATCHING
    addButton.addEventListener("click", () => {
        addHorses();
    });
    clearButton.addEventListener("click", () => {
        clearHorses();
    });
    startStopButton.addEventListener("click", () => {
        if (hm.horsesRunning()) {
            stopHorses();
        }
        else {
            startHorses();
        }
    });
    hm.addEventListener("horsesEnded", (event) => {
        onHorsesFinished();
    });
}
;
