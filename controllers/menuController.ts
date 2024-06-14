import {
  FetchShiftsByDate, fetchShiftsByDateOnly
} from "../dal/Shifts/ShiftFunctions";
import { getRecurringShiftsByJobType } from "../dal/ReacuringShifts/ReacuringShiftsFunctions";
import express, { Request, Response } from "express";
import moment from "moment";
import { daysOfWeek } from "../config/config";
import { Shift } from "../dal/models";

export const getShifts = async (req: Request, res: Response) => {
  try {
    const option = req.query.option as string | undefined;

    if (option === 'none') {
      console.log("Option is none");
    }
    if (!option) {
        res.status(400).json({ error: "Option parameter is missing" });
        return;
    }

    try {
      const recurringShifts = await getRecurringShiftsByJobType(option);
      res.json(recurringShifts);
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error fetching shifts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getShiftsByDate = async (req: Request, res: Response) => {
  try {
    const startDate = parseDate(req.query.startDate as string);
    const endDate = parseDate(req.query.endDate as string);
    const option = req.query.option as string;
    if (!option) {
      throw new Error("Option parameter is missing");
    }


    if (!startDate || !endDate) {
      res.status(400).json({ error: "Start date and end date are required" });
      return;
    }
    if(option === 'none') {
      const shifts = await fetchShiftsByDateOnly(startDate, endDate);
      const formattedShifts = shifts.map(formatShift);
      res.json(formattedShifts);
    }else{
      const shifts = await FetchShiftsByDate(startDate, endDate, option);
      const formattedShifts = shifts.map(formatShift);
      res.json(formattedShifts);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function parseDate(dateString: string | undefined): Date | undefined {
  return dateString ? new Date(dateString) : undefined;
}

function formatShift(shift: Shift): any {
  const shiftDay = shift.shift_day ? daysOfWeek[parseInt(shift.shift_day)] : "";

  return {
    ...shift,
    shift_day: shiftDay,
  };
}
