import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Query,
  Int,
  UseMiddleware,
  Ctx
} from "type-graphql";
import Order from "../entity/Order";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../MyContext";
//import User from "../entity/User";
import { getRepository } from "typeorm";
//import OrderDetail from "../entity/OrderDetail";
//import { Product } from "../entity/Product";

@InputType()
class CreateOrderDetailInput {
  @Field(() => Int)
  productId: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  sum: number;
}

@InputType()
class CreateOrderInput {
  @Field(() => [CreateOrderDetailInput])
  orderDetails: CreateOrderDetailInput[];
}

@Resolver()
export default class OrderResolver {
  @Query(() => [Order])
  @UseMiddleware(isAuth)
  async orders() {
    try {
      return await getRepository(Order)
        .createQueryBuilder("order")
        .innerJoinAndSelect("order.user", "user")
        .innerJoinAndSelect("order.orderDetails", "orderDetails")
        .innerJoinAndSelect("orderDetails.product", "product")
        .getMany();
    } catch (error) {
      return null;
    }
  }
  @Query(() => Order)
  @UseMiddleware(isAuth)
  async order(@Arg("id", () => Int) id: number) {
    try {
      return await getRepository(Order)
        .createQueryBuilder("order")
        .innerJoinAndSelect("order.user", "user")
        .innerJoinAndSelect("order.orderDetails", "orderDetails")
        .innerJoinAndSelect("orderDetails.product", "product")
        .where("order.orderId=:orderID")
        .setParameter("orderID", id)
        .getOne();
    } catch (error) {
      return null;
    }
  }

  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async createOrder(
    @Arg("input", () => CreateOrderInput) { orderDetails }: CreateOrderInput,
    @Ctx() { payload }: MyContext
  ) {
    if (!payload) throw Error("cant find user");
    const order = await Order.create({
      orderDetails,
      userId: +payload.userId
    }).save();
    return order.orderId;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteOrder(@Arg("id", () => Int) id: number) {
    try {
      await Order.delete({ orderId: id });
    } catch (error) {
      return false;
    }

    return true;
  }
}
