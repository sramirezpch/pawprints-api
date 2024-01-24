import { Router } from "express";
import * as authController from "../../controllers/auth";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);

export default router;
