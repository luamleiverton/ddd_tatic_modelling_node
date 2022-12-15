import { Order } from "sequelize";
import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";


@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false})
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    //recupera só o id
    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false})
    declare order_id: string;

    //recupera todo objeto
    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false})
    declare quantity:  number;

    @Column({ allowNull: false})
    declare name:  string;

    @Column({ allowNull: false})
    declare price:  number;

}