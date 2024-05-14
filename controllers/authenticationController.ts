import { Request, Response } from "express";

export const Login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  var userAuthenticated: Boolean = authenticateUser(username, password);
  if (!userAuthenticated) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = generateToken(username, password);
  res.cookie("token", token, { httpOnly: true }); // You may also want to consider other options such as 'secure: true' for HTTPS

  return res.json({ message: "Login successful", token });
};

function authenticateUser(username: string, password: string) {
  if (username == "avner" && password == "123") {
    return true;
  } else {
    return false;
  }
}
function generateToken(username: string, password: string) {
  return "123";
}
