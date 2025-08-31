import { CreateOptions, HydratedDocument, Model,} from "mongoose";


export abstract class DataBaseRepository<TDocuments> {
  constructor(protected readonly model: Model<TDocuments>) {}

  async create ({
    data,
    options,
  }:{
    data:Partial<TDocuments>[],
    options?:CreateOptions | undefined
  }): Promise<HydratedDocument<TDocuments>[] | undefined> {
    return await this.model.create(data, options)
  }


      



}
