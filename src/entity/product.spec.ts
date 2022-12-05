import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            const product = new Product("", "product1", 100);
        }).toThrowError("Id is required");

    });

    it("should throw error when productName is empty", () => {
        
        expect(() => {
            const product = new Product("p1", "", 100);
        }).toThrowError("Product Name is required");

    });

    it("should throw error when produce price is empty", () => {
        
        expect(() => {
            const product = new Product("p1", "product1", 0);
        }).toThrowError("Product price is required");

    });

    it("should change name", () => {
        const product = new Product("123", "product1", 10);
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2");

    });


    it("should change price", () => {
        const product = new Product("123", "product1", 10);
        product.changePrice(20)
        expect(product.price).toBe(20);

    });


});