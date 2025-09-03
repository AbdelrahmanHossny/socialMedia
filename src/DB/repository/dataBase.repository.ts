import { MongooseUpdateQueryOptions, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { CreateOptions, FlattenMaps, HydratedDocument, Model, PopulateOptions, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";

export type lean<T> =HydratedDocument<FlattenMaps<T>>
export abstract class DataBaseRepository<TDocuments> {
  constructor(protected readonly model: Model<TDocuments>) {}

    async findOne({
      filter ,
      select ,
      options
    }:{
      filter ?:RootFilterQuery<TDocuments>,
      select?:ProjectionType<TDocuments> |null,
      options?:QueryOptions<TDocuments> |null,
    }):Promise<lean<TDocuments> | HydratedDocument<TDocuments> | null>{
      const doc =  this.model.findOne(filter).select(select || "")
      if (options?.populate) {
        doc.populate(options.populate as PopulateOptions[])
      }
      if (options?.lean) {
        doc.lean(options.lean)
      }
      return await doc.exec()
    }


  async create({
    data,
    options,
  }: {
    data: Partial<TDocuments>[];
    options?: CreateOptions | undefined;
  }): Promise<HydratedDocument<TDocuments>[] | undefined> {
    return await this.model.create(data, options);
  }

  async updateOne({
    filter,
    update,
    options,
  }: {
    filter: RootFilterQuery<TDocuments>,
    update: UpdateQuery<TDocuments>,
    options?: MongooseUpdateQueryOptions<TDocuments> | null
  }): Promise<UpdateWriteOpResult> {

    return await this.model.updateOne(filter, update, options );
  }
}
