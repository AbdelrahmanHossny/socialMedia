import { model, models, Schema, Types } from "mongoose";

export enum GenderEnum {
  male = "male",
  female = "female",
}
export enum RoleEnum {
  user = "user",
  admin = "admin",
}

export interface Iuser {
  _id: Types.ObjectId;

  fristName: string;
  lastName: string;
  userName?: string;

  email: string;
  confirmEmailOtp?: string;
  confirmedAt?: Date;

  password: string;
  resetPasswordOtp?: string;
  ChangeCredentialsTime?: Date;

  phone?: string;
  address?: string;

  gender: GenderEnum;
  role: RoleEnum;

  createdAt: Date;
  updatedAt: Date;

  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
}

const userSchema = new Schema<Iuser>(
  {
    fristName: { type: String, required: true, minLength: 2, maxLength: 25 },
    lastName: { type: String, required: true, minLength: 2, maxLength: 25 },

    email: { type: String, required: true, unique: true },
    confirmEmailOtp: { type: String },
    confirmedAt: { type: Date },

    password: { type: String, required: true },
    resetPasswordOtp: { type: String },
    ChangeCredentialsTime: { type: Date },

    phone: { type: String },
    address: { type: String },

    gender: { type: String, enum: GenderEnum, default: GenderEnum.male },
    role: { type: String, enum: RoleEnum, default: RoleEnum.user },

    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema
  .virtual("userName")
  .set(function (value: string) {
    const [fristName, lastName] = value.split(" ") || [];
    this.set({ fristName, lastName });
  })
  .get(function () {
    return this.fristName + "" + this.lastName;
  });

export const UserModel = models.user || model<Iuser>("User", userSchema);





