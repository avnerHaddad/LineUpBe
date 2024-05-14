// routes/authRoutes.ts

import express from "express";
import { Login } from "../controllers/authenticationController";
import { getPossibleShifts, getUserJobs } from "../controllers/userController";
import { getShifts, getShiftsByDate } from "../controllers/menuController";
const router = express.Router();

router.post("/login", Login);
router.get("/prefShifts", getPossibleShifts);
router.get("/prefjobs", getUserJobs);
router.get("/api/shifts", getShifts);
router.get("/api/DateShifts", getShiftsByDate);

export default router;
