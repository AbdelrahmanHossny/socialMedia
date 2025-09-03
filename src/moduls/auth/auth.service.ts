import { Request, Response } from "express";
import { IconfirmEmailBodyInputsDto, IsignUpBodyInputsDto } from "./auth.dto";
import { UserModel } from "../../DB/models/user.model";
import { UserRepository } from "../../DB/repository/user.repository";
import {
  conflectException,
  NotFoundException,
} from "../../utils/response/error.response";
import { compareHash, genrateHash } from "../../utils/security/hash.security";
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

  confirmEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp }: IconfirmEmailBodyInputsDto = req.body;
    const user = await this.userModel.findOne({
      filter: {
        email,
        confirmEmailOtp: { $exists: true },
        confirmedAt: { $exists: false },
      },
    });

    if (!user) {
      throw new NotFoundException("In-valid Account or Already confirmed");
    }

    if (!(await compareHash(otp, user.confirmEmailOtp as string))) {
      throw new conflectException("In-valid confirmation code");
    }

    await this.userModel.updateOne({
      filter: { email },
      update: { confirmedAt: new Date(), $unset: { confirmEmailOtp: 1 } },
    });

    return res.status(200).json({ message: "Email confirmed" });
  };
}

export default new AuthentcationService();
