import express from "express";
import { getUser} from "../controllers/userController.js";

const userRouter = express.Router();

authRouter.route("/get").get(getUser);
export default userRouter;
