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
import User from "../entity/User";
import { getRepository } from "typeorm";
import OrderDetail from "../entity/OrderDetail";
import { Product } from "../entity/Product";

@InputType()
class CreateOrderDetailInput {
  @Field(() => Int)
  productID: number;
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

  @Mutation(() => Order)
  @UseMiddleware(isAuth)
  async createOrder(
    @Arg("input", () => CreateOrderInput) input: CreateOrderInput,
    @Ctx() ctx: MyContext
  ) {
    console.log(ctx);
    try {
      const user = await User.findOne({ where: { id: 1 } });
      if (!user) return null;

      const details = input.orderDetails.map(
        async ({ productID, quantity, sum }) => {
          const product = await Product.findOne({ where: { id: productID } });
          return OrderDetail.create({ product, quantity, sum });
        }
      );
      const order = await Order.create({
        user
      }).save();
      const orderDetails = await Promise.all(details);
      order.orderDetails = orderDetails;

      return await order.save();
    } catch (error) {
      return null;
    }
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
