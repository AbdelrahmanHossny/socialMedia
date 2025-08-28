import { NextFunction, Request, Response } from "express";
import type { ZodError, ZodType } from "zod";
import { BadrequestException } from "../moduls/utils/response/error.response";

type keyReqType = keyof Request;
type SchemaType = Partial<Record<keyReqType, ZodType>>;
type validationErrorType = Array<{
  key: keyReqType;
  issues: Array<{
    message: string;
    path: string | number | Symbol | undefined;
  }>;
}>;

export const validation = (Schema: SchemaType) => {
  return (req: Request, res: Response, next: NextFunction): NextFunction => {
    console.log(Schema);
    console.log(Object.keys(Schema));
    const validationErrors: validationErrorType = [];
    for (const key of Object.keys(Schema) as keyReqType[]) {
      if (!Schema[key]) continue;
      const validationRuselt = Schema[key].safeParse(req[key]);
      if (!validationRuselt.success) {
        const errors = validationRuselt.error as ZodError;
        validationErrors.push({
          key,
          issues: errors.issues.map((issue) => {
            return { message: issue.message, path: issue.path[0] };
          }),
        });
      }
    }

    if (validationErrors.length) {
      throw new BadrequestException("validation-Error", {
        validationErrors,
      });
    }

    return next() as unknown as NextFunction;
  };
};
