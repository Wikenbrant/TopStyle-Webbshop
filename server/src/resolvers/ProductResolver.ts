import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Query,
  Int
} from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
class UpdateProductInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async products() {
    return await Product.find();
  }
  @Query(() => Product)
  async product(@Arg("id", () => Int) id: number) {
    return await Product.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("input", () => CreateProductInput) input: CreateProductInput
  ) {
    const product = await Product.create(input).save();
    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UpdateProductInput) input: UpdateProductInput
  ) {
    await Product.update({ id }, input);
    const product = await Product.findOne({ where: { id } });
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete({ id });
    return true;
  }
}
