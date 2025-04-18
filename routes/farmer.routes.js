import express from "express";
import { registerFarmer} from "../controller/farmer.contorller.js";

const router = express.Router();

router.post("/register", registerFarmer);


export default router;
