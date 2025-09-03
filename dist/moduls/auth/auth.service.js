"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../DB/models/user.model");
const user_repository_1 = require("../../DB/repository/user.repository");
const error_response_1 = require("../../utils/response/error.response");
const hash_security_1 = require("../../utils/security/hash.security");
const email_event_1 = require("../../utils/events/email.event");
const otp_1 = require("../../utils/security/otp");
class AuthentcationService {
    userModel = new user_repository_1.UserRepository(user_model_1.UserModel);
    constructor() { }
    signup = async (req, res) => {
        const { username, email, password } = req.body;
        const userExist = await this.userModel.findOne({
            filter: { email },
        });
        if (userExist) {
            throw new error_response_1.conflectException("Email already Exist");
        }
        const otp = (0, otp_1.generateNumberOtp)();
        const user = await this.userModel.createUser({
            data: [
                {
                    username,
                    email,
                    password: await (0, hash_security_1.genrateHash)(password),
                    confirmEmailOtp: await (0, hash_security_1.genrateHash)(String(otp)),
                },
            ],
        });
        email_event_1.emailEvent.emit("confirmEmail", { to: email, otp });
        return res.status(201).json({ message: "Done", data: { user } });
    };
    login = (req, res) => {
        return res.status(200).json({ message: "Done", data: req.body });
    };
    confirmEmail = async (req, res) => {
        const { email, otp } = req.body;
        const user = await this.userModel.findOne({
            filter: {
                email,
                confirmEmailOtp: { $exists: true },
                confirmedAt: { $exists: false },
            },
        });
        if (!user) {
            throw new error_response_1.NotFoundException("In-valid Account or Already confirmed");
        }
        if (!(await (0, hash_security_1.compareHash)(otp, user.confirmEmailOtp))) {
            throw new error_response_1.conflectException("In-valid confirmation code");
        }
        await this.userModel.updateOne({
            filter: { email },
            update: { confirmedAt: new Date(), $unset: { confirmEmailOtp: 1 } },
        });
        return res.status(200).json({ message: "Email confirmed" });
    };
}
exports.default = new AuthentcationService();
