import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

export default (userRoles: string | any[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const { roles }: any = verify(token, process.env.SECRET!);
      let hasRole = false;
      roles.forEach((role: any) => {
        if (userRoles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
