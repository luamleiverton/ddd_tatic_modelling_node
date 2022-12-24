import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  datatimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.datatimeOcurred = new Date();
    this.eventData = eventData;
  }

}