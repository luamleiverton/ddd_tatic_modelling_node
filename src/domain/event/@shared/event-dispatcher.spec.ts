import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChanged from "../customer/customer-address-changed";
import CustomerCreatedEvent from "../customer/customer-created.event";
import ShowMessageWhenCustomerAddressIsChanged from "../customer/handler/show-message-when-customer-address-is-changed.handler";
import ShowMessage1WhenCustomerIsCreated from "../customer/handler/show-message1-when-customer-is-created.handler";
import ShowMessage2WhenCustomerIsCreated from "../customer/handler/show-message2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
  it("should register an event handler", () => {

    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    //o array existe?
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    //há um elemento dentro dele?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    //eventhandler está dentro do array?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    //eventhandler está dentro do array?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    //o array existe?
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    //Não há elementos dentro dele?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);

  });

  it("should unregister all events handler", () => {

    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    //eventhandler está dentro do array?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    //o array existe?
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

  });

  it("should notify when events handlers", () => {
    //cria o evento dispatcher
    const eventDispatcher = new EventDispatcher();
    //cria o event handler
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    //jest monitorar se o método handle é executado
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    //registra o evento
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    //eventhandler está dentro do array?
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    //chama a funcao de notificação com os dados do produto criado
    
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 Description",
      price: 10.0,
    });

    //quando o notify for executado o sendMailWhen... deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    //verifica se foi chamado
    expect(spyEventHandler).toHaveBeenCalled();
    
  });

  it("should notify when customer is created handlers", () => {
    //cria o evento dispatcher
    const eventDispatcher = new EventDispatcher();
    //cria o event handler
    const eventHandler1 = new ShowMessage1WhenCustomerIsCreated();
    const eventHandler2 = new ShowMessage2WhenCustomerIsCreated();

    //jest monitorar se o método handle é executado
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    
    //registra o evento
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1)
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2)


    //eventhandler está dentro do array?
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2);

    //chama a funcao de notificação com os dados do produto criado
    
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
    });

    //quando o notify for executado o sendMailWhen... deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    //verifica se foi chamado
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });

  it("should notify when customer address is changed handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowMessageWhenCustomerAddressIsChanged();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
  
    eventDispatcher.register("CustomerAddressChanged", eventHandler)

    expect(eventDispatcher.getEventHandlers['CustomerAddressChanged'][0]).toMatchObject(eventHandler);

    const customer = new Customer('1', 'customer1');
    const address = new Address('s1', 1, 'zip1', 'city1')
    customer.changeAddress(address);

    const customerAddressChanged = new CustomerAddressChanged({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    });

    eventDispatcher.notify(customerAddressChanged);

    expect(spyEventHandler).toHaveBeenCalled();

  });

});