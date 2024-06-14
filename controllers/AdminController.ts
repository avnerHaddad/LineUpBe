import {Request, Response} from "express";
import {getJobsByUser} from "../dal/Jobs/JobFunctions";
import {confirmConstraintDb, getAllConstraints} from "../dal/Constraints/ConstraintFunctions";
import {initDate} from "../config/config";
import {confirmConstraintQuery} from "../dal/Constraints/ConstraintQuerries";
import {CreateNextWeekShifts} from "../buissnesLogicLayer/tests";

export const getAllUnConfirmedConstraints = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try{
        const constraints = await getAllConstraints(initDate, new Date(), false);
        return res.json(constraints);
    }catch (error){
        console.log("error while getting unconfirmed constraints: " + error);
        return res.json({ message: "Error while getting unconfirmed constraints!" });
    }
};

export const confirmConstraint = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const  {constraint_id} = req.body;
    try{
        await confirmConstraintDb(constraint_id);
        return res.json({ message: "Constraint confirmed!" });
    }catch (error){
        console.log("error while confirming constraint: " + error);
        return res.json({ message: "Error while confirming constraint!" });
    }
}

export const createNextWeekShifts = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try{
        //set start date to next sunday and end date to next saturday
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + (7 - startDate.getDay()));
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()) + 7);
        await CreateNextWeekShifts(startDate, endDate);
        return res.json({ message: "Next week shifts created!" });
    }catch (error){
        console.log("error while creating next week shifts: " + error);
        return res.json({ message: "Error while creating next week shifts!" });
    }
}