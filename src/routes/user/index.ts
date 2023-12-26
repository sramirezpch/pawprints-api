import { Router } from "express";
import * as userController from "../../controllers/user";

const router: Router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
export default router;