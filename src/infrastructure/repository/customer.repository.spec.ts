import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./customer.repository";

describe("Customer Repository unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();

    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer1");
        const address = new Address("street1", 1, 'Zipcode1', "city 1");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id:"1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });

    });


    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer1");
        const address = new Address("street1", 1, "zip1", "city1");
        customer.Address = address;

        await customerRepository.create(customer);
        
        customer.changeName("customer2");
        customer.deactivate();
        customer.addRewardPoints(20);

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id:"1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: false,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });

    });



    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer1");
        const address = new Address("s1", 1, "zip1", "city'");
        customer.Address = address;

        await customerRepository.create(customer);
        

        const customerResult = await customerRepository.find(customer.id);
        const customerModel = await CustomerModel.findOne({
            where: {id: customer.id},
        });

        expect(customer).toStrictEqual(customerResult);

    });


    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    });



    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "customer1");
        const customer2 = new Customer("2", "customer2");
        const address1 = new Address("s1", 1, "zip1", "city1");
        customer1.Address = address1;
        customer1.addRewardPoints(20);
        customer1.activate();

        const address2 = new Address("s2", 2, "zip2", "city2");
        customer2.Address = address2;
        customer2.addRewardPoints(30);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll()
        
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
        
    });


});