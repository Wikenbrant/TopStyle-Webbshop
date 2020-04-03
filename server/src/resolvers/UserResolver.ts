import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Query,
  Int,
  Ctx,
  ObjectType
} from "type-graphql";
import User from "../entity/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "../MyContext";
import { sendRefreshToken } from "../sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth";
import { getConnection } from "typeorm";

@InputType()
class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }
  @Query(() => [User])
  async user(@Arg("id", () => Int) id: number) {
    return await User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async register(
    @Arg("input", () => RegisterInput) { name, email, password }: RegisterInput
  ) {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    }).save();
    return user;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
