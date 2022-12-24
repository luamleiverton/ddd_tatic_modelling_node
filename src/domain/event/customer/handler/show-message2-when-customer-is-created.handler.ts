import EventHandlerInterface from "../../@shared/event-handler.interface";
import eventInterface from "../../@shared/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ShowMessage2WhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated.")  
  }    
}