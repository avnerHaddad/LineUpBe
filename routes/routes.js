"use strict";
// routes/authRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticationController_1 = require("../controllers/authenticationController");
const userController_1 = require("../controllers/userController");
const menuController_1 = require("../controllers/menuController");
const router = express_1.default.Router();
router.post("/login", authenticationController_1.Login);
router.get("/prefShifts", userController_1.getPossibleShifts);
router.get("/prefjobs", userController_1.getUserJobs);
router.get("/api/shifts", menuController_1.getShifts);
router.get("/api/DateShifts", menuController_1.getShiftsByDate);
exports.default = router;
