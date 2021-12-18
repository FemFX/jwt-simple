import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedData: any = verify(token, process.env.SECRET!);
    req.user = decodedData;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
