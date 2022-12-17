import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: true,
        sync: { force: true },
      });
  
      await sequelize.addModels([
        CustomerModel,
        OrderModel,
        OrderItemModel,
        ProductModel,
      ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should create a new order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      
      await customerRepository.create(customer);
  
      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
  
      const ordemItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );
  
      const order = new Order("123", "123", [ordemItem]);
  
      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
  
      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });
  
      expect(orderModel?.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            order_id: "123",
            product_id: "123",
          },
        ],
      })
    })

    it("should update a order", async() => {

        const customerRepository = new CustomerRepository()
        const customer = new Customer("c1", "customer1")
        const address = new Address("s1", 1, "zip1", "city1");
        customer.changeAddress(address);

        const customer2 = new Customer("c2", "customer2")
        const address2 = new Address("s2", 2, "zip2", "city2");
        customer2.changeAddress(address);

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "product1", 10);
        const product2 = new Product("p2", "product2", 15);


        await productRepository.create(product1);


        const orderRepository = new OrderRepository();

        const orderItem = new OrderItem("1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 3);
        const order = new Order("o1", "c1", [orderItem]);

        await orderRepository.create(order);

        order.changeCustomer("c2");
        order.changeItem("1", orderItem2);

              
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ['items'], });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: customer2.id,
            total: order.total(),
            items: order.items.map((orderItem) => ({
                id: "1",
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: orderItem.productId,

            })),
        })
    });

    it("should find a order", async () => {

        const customerRepository = new CustomerRepository()
        const customer = new Customer("c1", "customer1");
        const address = new Address("s1", 1, "zip1", "city1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "product1", 10)
        await productRepository.create(product);

        const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);

        const order = new Order("o1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository()
        await orderRepository.create(order);

        const orderFound = await orderRepository.find(order.id);

        expect(orderFound).toStrictEqual(order);

    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("abcdef");
        }).rejects.toThrow("Order not found");
    });


    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "customer1");
        const address1 = new Address("s1", 1, "zip1", "city1");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);


        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "product1", 10);
        const product2 = new Product("p2", "product2", 20);

        await productRepository.create(product1)
        await productRepository.create(product2)


        const orderItem = new OrderItem("i1", product1.name, product1.price, product1.id, 2);
        const orderItem2 = new OrderItem("i2", product2.name, product2.price, product2.id, 2);


        const orderRepository = new OrderRepository()
        const order = new Order("o1", customer1.id, [orderItem]);
        const order2 = new Order("o2", customer1.id, [orderItem2]);

        await orderRepository.create(order);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll()
        
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
        
    });




  });