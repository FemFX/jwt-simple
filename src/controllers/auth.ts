import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/User";
import Role from "../models/Role";

const generateAccessToken = (id: any, roles: any) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: "24h" });
};

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уде существует" });
      }
      const userRole = await Role.findOne({ value: "USER" });
      const newUser = new User({
        username,
        password: hashSync(password, 12),
        roles: [userRole.value],
      });
      await newUser.save();
      return res.status(200).json("Регистрация прошла успешно");
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уде существует" });
      }
      const validPass = compareSync(password, user.password);
      if (!validPass) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error" });
    }
  }
}
export default new AuthController();
