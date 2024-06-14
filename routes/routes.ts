// routes/authRoutes.ts

import express from "express";
import { Login } from "../controllers/authenticationController";
import { calculateFreePoints, getUserJobs, resetPrefs, setConstraint, setPrefs } from "../controllers/userController";
import { getShifts, getShiftsByDate } from "../controllers/menuController";
import {confirmConstraint, createNextWeekShifts} from "../controllers/AdminController";
const router = express.Router();

router.post("/login", Login);
router.post("/setPref", setPrefs);
router.get("/jobs", getUserJobs);
router.get("/api/shifts", getShifts);
router.get("/api/DateShifts", getShiftsByDate);
router.get("/points", calculateFreePoints);
router.post("/resetprefs", resetPrefs);
router.post("/setconstraint", setConstraint);
router.post("/api/nextBoard", createNextWeekShifts);
router.post("/constraint/confirm", confirmConstraint);


export default router;
