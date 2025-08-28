"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async ({ from = process.env.App_Email, to = "", subject = "sara7a", text = "", html = "", attachments = [], } = {}) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "abdelrahmanhossni49@gmail.com",
            pass: "cnpy kqmm agau mhmq",
        },
    });
    const info = await transporter.sendMail({
        from: `"Sara7a" <${from}>`,
        to,
        text,
        subject,
        html,
        attachments,
    });
    console.log("Message sent: %s", info.messageId);
};
exports.sendEmail = sendEmail;
class AuthentcationService {
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        (0, exports.sendEmail)({
            to: email,
            html: `email confarmid`,
            subject: "confirm Email",
            text: "Email confarmid you can login now "
        });
        console.log({ username, email, password });
        return res.status(201).json({ message: "Done", data: req.body });
    };
    login = (req, res) => {
        return res.status(200).json({ message: "Done", data: req.body });
    };
    confirmEmail = (req, res) => {
        return res.status(200).json({ message: "Email confimed", data: req.body });
    };
}
exports.default = new AuthentcationService();
