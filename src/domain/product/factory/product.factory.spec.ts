import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

  it("should create a product type", () => {

    const product = ProductFactory.create("a", "productA", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("productA");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");

  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create("c", "ProductC", 1)).toThrowError("Product type not supported");
  });
});