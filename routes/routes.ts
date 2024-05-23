// routes/authRoutes.ts

import express from "express";
import { Login } from "../controllers/authenticationController";
import { calculateFreePoints, getPossibleShifts, getUserJobs, resetPrefs, setConstraint, setPrefs } from "../controllers/userController";
import { getShifts, getShiftsByDate } from "../controllers/menuController";
const router = express.Router();

router.post("/login", Login);
router.post("/setPref", setPrefs);
router.get("/prefShifts", getPossibleShifts);
router.get("/prefjobs", getUserJobs);
router.get("/api/shifts", getShifts);
router.get("/api/DateShifts", getShiftsByDate);
router.get("/points", calculateFreePoints);
router.post("/resetprefs", resetPrefs);
router.post("/setconstraint", setConstraint);


export default router;
