import express, { Request, Response } from "express";
import cors from "cors";
import { user } from "./buissnesLogicLayer/user";
import { job, jobEnum } from "./buissnesLogicLayer/job";
import router from "./routes/routes";
const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace this with the origin of your frontend application
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

app.use(router);

// Your route definitions
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/api/current_shifts", (req: Request, res: Response) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/api/userinfo", (req: Request, res: Response) => {
  let avner = new user("avner", 5, 5, jobEnum.Matzat);
  const response = {
    message: "User data retrieved successfully",
    data: JSON.stringify(avner),
  };
  res.json(response);
});

// Start the server
const PORT: number = parseInt(process.env.PORT!) || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
