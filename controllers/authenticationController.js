"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    var userAuthenticated = authenticateUser(username, password);
    if (!userAuthenticated) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = generateToken(username, password);
    res.cookie("token", token, { httpOnly: true }); // You may also want to consider other options such as 'secure: true' for HTTPS
    return res.json({ message: "Login successful", token });
});
exports.Login = Login;
function authenticateUser(username, password) {
    if (username == "avner" && password == "123") {
        return true;
    }
    else {
        return false;
    }
}
function generateToken(username, password) {
    return "123";
}
