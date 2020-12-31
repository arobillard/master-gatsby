import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // 1. loop over each item in order
  // 2. calc total for that pizza
  // 3. add that total to running total
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((za) => za.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0); // 0 is the starting amount
  return total;
}
