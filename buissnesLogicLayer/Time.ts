export  class TIme{
    hours!: number;
    minutes!: number;
    seconds!: number;
    constructor(timeString: string) {
        const time = timeString.split(":");
        this.hours = parseInt(time[0]);
        this.minutes = parseInt(time[1]);
        this.seconds = parseInt(time[2]);
    }
}