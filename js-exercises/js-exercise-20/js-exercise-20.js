const fruits = ["Apple", "Banana", "Cherry"];
const formatFruits = fruits.map((fruit, index) => {
  return `Index ${index}: [${fruit}] wuxuu ka kooban yahay ${fruit.length} Xarfood`;
});
console.log(formatFruits.join("\n"));
