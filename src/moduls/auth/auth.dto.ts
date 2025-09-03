import * as valdators from "./auth.validation"
import {z} from "zod"

export type IsignUpBodyInputsDto =z.infer<typeof valdators.signup.body>
export type IconfirmEmailBodyInputsDto =z.infer<typeof valdators.confirmEmail.body>

// export interface IsignUpBodyInputsDto {
//     username:string,
//     email:string,
//     password:string
// }

export interface IloginBodyInputsDto {
    email:string,
    password:string
}