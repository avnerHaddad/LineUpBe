import { Request, Response } from "express";
import { FetchUser, getAllUsers } from "../dal/User/userFunctions";

export const Login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  var userAuthenticated: Boolean = authenticateUser(username, password);
  if (!userAuthenticated) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = generateToken(username, password);
  res.cookie("token", token, { httpOnly: false,secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: 'strict'});
   // Adjust according to your needs ('strict', 'lax', or 'none') }); // You may also want to consider other options such as 'secure: true' for HTTPS
   console.log({ message: "Login successful", token, user: await FetchUser(username) });
  return res.json({ message: "Login successful", token, user: await FetchUser(username) });
};

function authenticateUser(username: string, password: string) {
  let users = getAllUsers();
  console.log(users);
  if (username == "avner" && password == "123") {
    return true;
  } else {
    return false;
  }
}
function generateToken(username: string, password: string) {
  return "123";
}
