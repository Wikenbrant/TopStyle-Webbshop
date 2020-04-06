import User from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  return sign(
    { userId: user.userId, name: user.name },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "30m"
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.userId, name: user.name, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d"
    }
  );
};
