"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIme = void 0;
class TIme {
    constructor(timeString) {
        const time = timeString.split(":");
        this.hours = parseInt(time[0]);
        this.minutes = parseInt(time[1]);
        this.seconds = parseInt(time[2]);
    }
}
exports.TIme = TIme;
