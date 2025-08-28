// Set Up ENV
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./config/.env.devolopment") });

// load Exprees
import express from "express";
import type { Express, Request, Response } from "express";

// third party moddleware
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

// import module_Routing
import authController from "./moduls/auth/auth.controller";
import { GlobalErrorHandling } from "./moduls/utils/response/error.response";
import connectDB from "./DB/connection.db";

// Handel base rate limit on all api requests
const limiter = rateLimit({
  windowMs: 60 * 60000,
  limit: 2000,
  message: { error: "Too many requst please try again later" },
  statusCode: 429,
});

const Bootstrap = async(): Promise<void> => {
  // application start point
  const port: number | string = process.env.PORT || 5000;
  const app: Express = express();

  // Gloubal application middleware
  app.use(cors(), express.json(), helmet());
  app.use(limiter);

  // application-Routing
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: `Welcome to ${process.env.APPLICATION_NAME} Back End Landing Page 👌😜 `,
    });
  });

  // Sub-Module-Application-Routing
  app.use("/auth", authController);

  // In-valid Routing
  app.use("{/*dummy}", (req: Request, res: Response) => {
    return res.status(404).json({
      message: "In-valid application routing plz check the method and url ❌🥱",
    });
  });

  //Global-Error-Handling
  app.use(GlobalErrorHandling);

  //DB 

  await connectDB()

  // start-server
  app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀🚀`);
  });
};

export default Bootstrap;
