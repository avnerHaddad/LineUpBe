"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./buissnesLogicLayer/user");
const job_1 = require("./buissnesLogicLayer/job");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Replace this with the origin of your frontend application
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(routes_1.default);
// Your route definitions
app.get("/api/test", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});
app.get("/api/current_shifts", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});
app.get("/api/userinfo", (req, res) => {
    let avner = new user_1.user("avner", 5, 5, job_1.jobEnum.Matzat);
    const response = {
        message: "User data retrieved successfully",
        data: JSON.stringify(avner),
    };
    res.json(response);
});
// Start the server
const PORT = parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
