import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

//agregado1 - relação de id
let customer = new Customer("123", "Teste");
const address = new Address("Rua um", 3, "123456-78", "Rio de Janeiro");
//customer.Address = address;
customer.activate();

//agregado 2 = relação de objeto, estao na mesma entidade
const item1 = new OrderItem("1", "p1", "Item 1", 10, 2);
const item2 = new OrderItem("2", "p2", "Item 2", 15, 2);
const order = new Order("1", "123", [item1, item2]);