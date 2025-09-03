import { Request, Response } from "express";
import { IsignUpBodyInputsDto } from "./auth.dto";
import { UserModel } from "../../DB/models/user.model";
import { UserRepository } from "../../DB/repository/user.repository";
import { conflectException } from "../../utils/response/error.response";
import { genrateHash } from "../../utils/security/hash.security";
import { emailEvent } from "../../utils/events/email.event";
import { generateNumberOtp } from "../../utils/security/otp";

class AuthentcationService {
  private userModel = new UserRepository(UserModel);

  constructor() {}

  signup = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password }: IsignUpBodyInputsDto = req.body;

    const userExist = await this.userModel.findOne({
      filter: { email },
    });
    if (userExist) {
      throw new conflectException("Email already Exist");
    }

    const otp = generateNumberOtp();

    const user = await this.userModel.createUser({
      data: [
        {
          username,
          email,
          password: await genrateHash(password),
          confirmEmailOtp: await genrateHash(String(otp)),
        },
      ],
    });

    emailEvent.emit("confirmEmail", { to: email, otp });

    return res.status(201).json({ message: "Done", data: { user } });
  };

  login = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: "Done", data: req.body });
  };

  confirmEmail = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: "Email confimed", data: req.body });
  };
}

export default new AuthentcationService();
