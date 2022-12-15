import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });

    it("should throw error when customerId is empty", () => {
        
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");

    });

    it("should throw error when itemQuantity is zero", () => {
        
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("ItemQuantity must be grater than 0");

    });

    it("should calculate total", () => {
        
        const item1 = new OrderItem("i1", "item 1", 10.0, "p1", 2);
        const item2 = new OrderItem("i2", "item 2", 15.0, "p2", 2);
        const order = new Order("o1", "c1", [item1,item2])
        const total  = order.total();
        expect(total).toBe(50)

    });


    it("should throw error if item quantity is less or equal 0", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "item 1", 10.0, "p1",  0);
            const order = new Order("o1", "c1", [item1])
        }).toThrowError("Quantity must be grater than 0")

    });

});