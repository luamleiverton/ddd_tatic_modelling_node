import EventHandlerInterface from "../../@shared/event-handler.interface";
import eventInterface from "../../@shared/event.interface";
import CustomerAddressChanged from "../customer-address-changed";

export default class ShowMessageWhenCustomerAddressIsChanged implements EventHandlerInterface<CustomerAddressChanged> {
  handle(event: CustomerAddressChanged): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, 
    ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }

}