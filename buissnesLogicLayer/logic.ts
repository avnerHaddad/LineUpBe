import {user} from "./user";
import {shiftBoard} from "./shiftBoard";
import {shift} from "./shift";
export interface logic{
    applyLogic(user:user, shiftBoard:shiftBoard, newShift: shift):void;
}
export class NearestShiftLogic implements logic {
    applyLogic(user: user, shiftBoard: shiftBoard, newShift: shift): void {
        //remove from possibilites of shifts from the day before and after the shift except for shifts with the same type as this one
        //check if the shifts are not undefined
        const prevShift = shiftBoard.getPrevShift(newShift);
        const nextShift = shiftBoard.getNextShift(newShift);
        if (prevShift) {
            prevShift.removeUserById(user.id);
            const prevPrevShift = shiftBoard.getPrevShift(prevShift);
            if (prevPrevShift) {
                prevPrevShift.removeUserById(user.id);
            }
        }
        if (nextShift) {
            nextShift.removeUserById(user.id);
            const nextNextShift = shiftBoard.getNextShift(nextShift);
            if (nextNextShift) {
                nextNextShift.removeUserById(user.id);
            }
        }




    }
}


export class MaxShiftsPerWeekLogic implements logic {
    applyLogic(user:user, shiftBoard:shiftBoard, newShift: shift): void {
        //remove from possibilites of shifts from the day before and after the shift except for shifts with the same type as this one
        const shiftsThisWeek = shiftBoard.getShiftsForUser(user.id);
        if (shiftsThisWeek.length >= user.maxShiftsPerWeek) {
            shiftBoard.shifts.forEach(shift => {
                shift.removeUserById(user.id);
            });
        }
    }
}
export class NightShiftLogic implements logic {
    applyLogic(user:user, shiftBoard:shiftBoard, newShift: shift): void {
        if (newShift.type === 'night'){
            // Remove user from all night shifts possibilities
            shiftBoard.shifts.forEach(shift => {
                if (shift.type === 'night') {
                    shift.removeUserById(user.id);
                }
            });
        }
    }
}

export class NoSameDayLogic implements logic {
    applyLogic(user:user, shiftBoard:shiftBoard, newShift: shift): void {
        //remove from possibilites of shifts from the day before and after the shift except for shifts with the same type as this one
        const shiftsThisWeek = shiftBoard.getShiftsForUser(user.id);
        const shiftsToday = shiftBoard.getshiftsByWeekday(newShift.weekday);
        shiftsToday.forEach(shift => {
            shift.removeUserById(user.id);
        });
    }
}
