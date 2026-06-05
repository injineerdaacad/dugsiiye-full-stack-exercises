import express from "express";
import { sayGoodbye } from "../controllers/goodbye.controller.js";

const router = express.Router();

router.get("/", sayGoodbye);

export default router;