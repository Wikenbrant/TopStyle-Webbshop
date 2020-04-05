import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Column
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";
import OrderDetail from "./OrderDetail";
import "reflect-metadata";

@ObjectType()
@Entity()
export default class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field(() => [OrderDetail])
  @OneToMany(
    () => OrderDetail,
    detail => detail.order,
    { cascade: true }
  )
  orderDetails: OrderDetail[];
}
