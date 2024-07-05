//main
import {shiftMaster} from "./shiftMaster";
import {writeShifts} from "../dal/Shifts/ShiftFunctions";

export async function CreateNextWeekShifts(startDate: Date, endDate: Date) {
    const shiftMasterInstance = new shiftMaster();
    await shiftMasterInstance.initialiseUsers();
    await shiftMasterInstance.initialiseShifts(startDate, endDate);
   let shifts = await shiftMasterInstance.solve();
   // @ts-ignore
    await writeShifts(startDate, endDate, shifts);
  }




