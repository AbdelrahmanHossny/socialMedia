import { CreateOptions, Model } from "mongoose";
import { DataBaseRepository } from "./dataBase.repository";
import { Iuser as TDocuments } from "../models/user.model";
import { HydratedDocument } from "mongoose";
import { BadrequestException } from "../../utils/response/error.response";

export class UserRepository extends DataBaseRepository<TDocuments> {
  constructor(protected override readonly model: Model<TDocuments>) {
    super(model);
  }

  async createUser({
    data,
    options,
  }: {
    data: Partial<TDocuments>[];
    options?: CreateOptions;
  }): Promise<HydratedDocument<TDocuments>> {
    const [user] = (await this.create({ data, options })) || [];
    if (!user) {
      throw new BadrequestException("Fail to Creat this User");
    }
    return user;
  }
}
