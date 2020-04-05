import {
  Entity,
  BaseEntity,
  ManyToOne,
  //PrimaryColumn,
  Column,
  //JoinTable,
  PrimaryGeneratedColumn,
  JoinColumn
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import Order from "./Order";
import { Product } from "./Product";

@ObjectType()
@Entity()
export default class OrderDetail extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  orderId: number;

  @Field(() => Int)
  @Column()
  productId: number;

  @Field(() => Order)
  @ManyToOne(
    () => Order,
    order => order.orderDetails
  )
  @JoinColumn({ name: "orderId" })
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Int)
  @Column()
  sum: number;
}
