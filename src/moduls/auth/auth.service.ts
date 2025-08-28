import { Request, Response } from "express";
import { IsignUpBodyInputsDto } from "./auth.dto";
import nodemailer from "nodemailer";

export const sendEmail = async ({
  from = process.env.App_Email,
  to = "",
  subject = "sara7a",
  text = "",
  html = "",
  attachments = [],
} = {}) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "abdelrahmanhossni49@gmail.com",
      pass: "cnpy kqmm agau mhmq",
    },
  });

  const info = await transporter.sendMail({
    from: `"Sara7a" <${from}>`, // sender address
    to,
    text,
    subject,
    html,
    attachments,
  });

  console.log("Message sent: %s", info.messageId);
};





class AuthentcationService {
  constructor() {}

  signup = async(req: Request, res: Response): Promise<Response> => {
    const { username, email, password }: IsignUpBodyInputsDto = req.body;
    sendEmail({
      to:email,
      html:`email confarmid`,
      subject:"confirm Email",
      text:"Email confarmid you can login now "
    })

    console.log({ username, email, password });

  

    return res.status(201).json({ message: "Done", data: req.body });
  };

  login = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: "Done", data: req.body });
  };

  confirmEmail = (req: Request, res: Response): Response => {
    return res.status(200).json({ message: "Email confimed", data: req.body });
  };
}

export default new AuthentcationService();
