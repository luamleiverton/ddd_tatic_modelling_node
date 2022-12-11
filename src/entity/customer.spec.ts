import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            let customer = new Customer("", "Jhon");
        }).toThrowError("Id is required");

    });

    it("should throw error when name is empty", () => {
        
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");

    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "John");
        //Act
        customer.changeName("Jane");
        //Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        //Arrange
        const customer = new Customer("1", "Customer1");
        const address = new Address("Street1", 123, "000", "Pirapora");
        customer.Address = address;
        //Act
        customer.activate();
        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        //Arrange
        const customer = new Customer("1", "Customer1");
        //Act
        customer.deactivate();
        //Assert
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when activate customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer1");
            customer.activate();

        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "customer1")
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20);
    });


});