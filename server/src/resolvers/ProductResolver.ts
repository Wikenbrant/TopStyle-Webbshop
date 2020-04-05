import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Query,
  Int,
  UseMiddleware
} from "type-graphql";
import { Product } from "../entity/Product";
import { isAuth } from "../middleware/isAuth";

@InputType()
class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;
}

@InputType()
class UpdateProductInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  price?: number;
}

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async products() {
    return await Product.find();
  }
  @Query(() => Product)
  async product(@Arg("id", () => Int) id: number) {
    return await Product.findOne({ where: { productId: id } });
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuth)
  async createProduct(
    @Arg("input", () => CreateProductInput) input: CreateProductInput
  ) {
    const product = await Product.create(input).save();
    return product;
  }

  @Mutation(() => Product)
  @UseMiddleware(isAuth)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UpdateProductInput) input: UpdateProductInput
  ) {
    await Product.update({ productId: id }, input);
    const product = await Product.findOne({ where: { id } });
    return product;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete({ productId: id });
    return true;
  }
}
