import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "customer1");
        const item1 = new OrderItem("i1", "p1", "item1", 100, 1);
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);

    });


    it("should get total of all orders", () => {
        const item1 = new OrderItem("i1", "p1", "item1", 100, 1);
        const item2 = new OrderItem("i2", "p2", "item2", 200, 2);
        
        const order1 = new Order("o1", "order1", [item1])
        const order2 = new Order("o2", "order2", [item2])

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });
});
