import { Router } from "express";
import AuthentcationService from "./auth.service"
import { validation } from "../../middleware/validation.middleware";
import * as validators from "./auth.validation"
const router =Router()

router.post("/signup" ,validation(validators.signup), AuthentcationService.signup)
router.post("/login" ,AuthentcationService.login)
router.post("/confirmEmail" ,AuthentcationService.confirmEmail)

export default router