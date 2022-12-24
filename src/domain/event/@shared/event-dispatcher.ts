import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  
  private eventHandlers: { [eventName: string]: EventHandlerInterface[]} = {};
  
  get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
    return this.eventHandlers;
  }

  notify(event: eventInterface): void {
    //pega o eventName no construtor
    const eventName = event.constructor.name;
    //existe algum evento com esse nome
    if (this.eventHandlers[eventName]) {
      //percorra o vetor para cada evento e execute todos os handlers
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
      if(!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(eventHandler);

  }
  unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
    //evento existe?  
    if(this.eventHandlers[eventName]) {
      //qual a posicao do evento no array?  
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      //indice existe?  
      if (index !== -1) {
        //remova o evento do array
          this.eventHandlers[eventName].splice(index, 1);
        }
      }
  }

  unregisterAll(): void {
      this.eventHandlers = {};
  }
}