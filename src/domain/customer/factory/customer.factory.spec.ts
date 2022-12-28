import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("s1", 1, "zip1", "city1");
    let customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });
});