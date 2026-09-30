const input = document.querySelector("#productInput");
const button = document.querySelector("#addButton");
const list = document.querySelector("#productList");
const addFromListButton = document.querySelector("#addFromListButton");

const products = [
  "Молоко",
  "Картофель",
  "Лук",
  "Молоко",
  "Морковь"
];


// Проверяем, есть ли продукт уже на странице
function isProductExists(productName) {

  const items = list.querySelectorAll("li");

  const normalizedProduct = productName
    .trim()
    .toLowerCase();

  for (const item of items) {

    const existingProduct = item.textContent
      .trim()
      .toLowerCase();

    if (existingProduct === normalizedProduct) {
      return true;
    }
  }

  return false;
}


// Добавляет продукт
function addProductToList(productName) {

  productName = productName.trim();

  if (productName === "") {
    return;
  }

  // Если продукт уже есть — ничего не делаем
  if (isProductExists(productName)) {
    return;
  }

  const li = document.createElement("li");

  li.textContent = productName;

  li.addEventListener("click", () => {
    li.classList.toggle("bought");
  });

  list.append(li);
}


// Добавление вручную
function addProduct() {

  const productName = input.value;

  addProductToList(productName);

  input.value = "";
  input.focus();
}


button.addEventListener("click", addProduct);


// Добавление по Enter
input.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    addProduct();
  }

});


// Добавление продуктов из массива
addFromListButton.addEventListener("click", () => {

  products.forEach((product) => {

    addProductToList(product);

  });

});