import { Router } from "express";
import { login, me } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/middleware.js";

const router = Router();

router.post("/login", login);
// router.use(verifyToken);
router.get("/me", verifyToken, me);

export default router;
