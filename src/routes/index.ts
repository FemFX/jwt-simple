import { response, Router } from "express";
import { check } from "express-validator";
import auth from "../controllers/auth";
import authMiddleware from "../middleware/auth";
import isAdminMiddleware from "../middleware/admin";

const router = Router();

router.post(
  "/register",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 16 символов"
    ).isLength({
      min: 4,
      max: 16,
    }),
  ],
  auth.register
);
router.post("/login", auth.login);
router.get(
  "/users",
  authMiddleware,
  isAdminMiddleware(["ADMIN"]),
  auth.getUsers
);

export default router;
