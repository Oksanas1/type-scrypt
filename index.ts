type Order = {
  id: number,
  pizza: string,
  status: 'order' | 'completed',
};

type Pizza = {
  id: number,
  name: string,
  price: number,
};

let cashInRegister: number = 100;
let nextOrderId: number = 1;
let nextPizzaId = 1;
const orderQueue: Order[] = [];

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "paperoni", price: 8, },
  { id: nextPizzaId++, name: "margerita", price: 10, },
  { id: nextPizzaId++, name: "vega", price: 5, },
  { id: nextPizzaId++, name: "dyablo", price: 2, },
];

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

function addNewPizza(pizzaObj: Omit<Pizza, 'id'>): Pizza {
  const newPizza = {
    id: nextPizzaId++,
    ...pizzaObj,
  };
  addToArray<Pizza>(menu, newPizza);
  return newPizza;
}

function getPizzaByName(namePizza: string): Pizza | undefined {
  return menu.find(({ name }) => name.toLowerCase() === namePizza.toLowerCase());
}

function getPizzaOrderById(orderId: number): Order | undefined {
  return orderQueue.find(({ id }) => id === orderId);
}

function placeOrder(namePizza: string): Order | undefined {
  const selectedPizza = getPizzaByName(namePizza);

  if (!selectedPizza) {
    console.error('No pizza found');
    return;
  }

  const orderPizzaObj: Order = {
    id: nextOrderId++,
    pizza: selectedPizza.name,
    status: 'order',
  };
  cashInRegister += selectedPizza.price;
  addToArray<Order>(orderQueue, orderPizzaObj);

  return orderPizzaObj;
}

function completeOrder(orderId: number): Order | undefined {
  const order = getPizzaOrderById(orderId);

  if (!order) {
    console.error('no order find by Id');
    return;
  }

  order.status = 'completed';
  return order;
}

function getPizzaDetail(indetifier: string | number): Order | Pizza | undefined {
  if (typeof indetifier === 'string') {
    return getPizzaByName(indetifier);
  } else if (typeof indetifier === 'number') {
    return getPizzaOrderById(indetifier);
  }
}

addNewPizza({ name: 'new', price: 3 })
console.log(cashInRegister, orderQueue, placeOrder("paperoni"));
