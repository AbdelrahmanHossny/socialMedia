"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_model_1 = require("../../DB/models/user.model");
const user_repository_1 = require("../../DB/repository/user.repository");
const error_response_1 = require("../utils/response/error.response");
const hash_security_1 = require("../utils/security/hash.security");
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
    userModel = new user_repository_1.UserRepository(user_model_1.UserModel);
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const userExist = await this.userModel.findOne({
            filter: { email }
        });
        if (userExist) {
            throw new error_response_1.conflectException("Email already Exist");
        }
        const user = await this.userModel.createUser({
            data: [{ username, email, password: await (0, hash_security_1.genrateHash)(password) }],
        });
        return res.status(201).json({ message: "Done", data: { user } });
    };
    login = (req, res) => {
        return res.status(200).json({ message: "Done", data: req.body });
    };
    confirmEmail = (req, res) => {
        return res.status(200).json({ message: "Email confimed", data: req.body });
    };
}
exports.default = new AuthentcationService();
