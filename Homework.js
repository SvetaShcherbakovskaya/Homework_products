const input = document.querySelector("#productInput");
const categoryInput = document.querySelector("#categoryInput");
const addButton = document.querySelector("#addButton");

const list = document.querySelector("#productList");

const allButton = document.querySelector("#allButton");
const needButton = document.querySelector("#needButton");
const boughtButton = document.querySelector("#boughtButton");

const createDraftButton = document.querySelector("#createDraftButton");
const saveDraftButton = document.querySelector("#saveDraftButton");
const cancelDraftButton = document.querySelector("#cancelDraftButton");


let products = [
  {
    id: 1,
    name: "Молоко",
    category: "Молочные продукты",
    bought: false
  },
  {
    id: 2,
    name: "Хлеб",
    category: "Выпечка",
    bought: true
  },
  {
    id: 3,
    name: "Сыр",
    category: "Молочные продукты",
    bought: false
  },
  {
    id: 4,
    name: "Яблоки",
    category: "Фрукты",
    bought: false
  }
];


let draftProducts = null;


// 1. Вывод списка
function renderProducts(productsToRender) {

  list.innerHTML = "";

  for (const product of productsToRender) {

    const li = document.createElement("li");

    li.textContent =
      `${product.name} — ${product.category}`;

    li.dataset.id = product.id;

    if (product.bought) {
      li.classList.add("bought");
    }

    li.addEventListener("click", function () {
      toggleProduct(product.id);
    });

    list.appendChild(li);
  }
}


// 2. Добавление продукта
function addProduct(name, category) {

  name = name.trim();
  category = category.trim();

  if (name === "" || category === "") {
    return;
  }


  const isDuplicate = products.some(function (product) {

    return product.name
      .trim()
      .toLowerCase() === name.toLowerCase();

  });


  if (isDuplicate) {
    alert("Такой продукт уже есть");
    return;
  }


  const newProduct = {
    id: products.length + 1,
    name: name,
    category: category,
    bought: false
  };


  products.push(newProduct);

  renderProducts(products);


  input.value = "";
  categoryInput.value = "";
}


// 3. Куплено / не куплено
function toggleProduct(id) {

  const product = products.find(function (product) {
    return product.id === id;
  });


  product.bought = !product.bought;

  renderProducts(products);
}


// 4. Фильтрация
function filterProducts(filter) {

  if (filter === "all") {
    renderProducts(products);
  }


  if (filter === "need") {

    const filteredProducts = products.filter(function (product) {
      return product.bought === false;
    });

    renderProducts(filteredProducts);
  }


  if (filter === "bought") {

    const filteredProducts = products.filter(function (product) {
      return product.bought === true;
    });

    renderProducts(filteredProducts);
  }
}


// 5. Создание черновика
function createDraft() {

  // Поверхностная копия
  const copy = [...products];

  console.log(products === copy);
  console.log(products[0] === copy[0]);


  // Глубокая копия
  draftProducts = structuredClone(products);

  console.log(products === draftProducts);
  console.log(products[0] === draftProducts[0]);
}


// Сохранить черновик
function saveDraft() {

  if (draftProducts === null) {
    return;
  }

  products = structuredClone(draftProducts);

  draftProducts = null;

  renderProducts(products);
}


// Отменить черновик
function cancelDraft() {

  draftProducts = null;

  renderProducts(products);
}


// Добавление продукта
addButton.addEventListener("click", function () {

  addProduct(
    input.value,
    categoryInput.value
  );

});


// Все
allButton.addEventListener("click", function () {

  filterProducts("all");

});


// Нужно купить
needButton.addEventListener("click", function () {

  filterProducts("need");

});


// Куплено
boughtButton.addEventListener("click", function () {

  filterProducts("bought");

});


// Создать черновик
createDraftButton.addEventListener("click", function () {

  createDraft();

});


// Сохранить
saveDraftButton.addEventListener("click", function () {

  saveDraft();

});


// Отменить
cancelDraftButton.addEventListener("click", function () {

  cancelDraft();

});


// Первый вывод списка
renderProducts(products);