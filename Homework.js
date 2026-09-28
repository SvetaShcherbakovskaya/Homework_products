const input = document.querySelector("#productInput");
const button = document.querySelector("#addButton");
const list = document.querySelector("#productList");

function addProduct() {
  const productName = input.value.trim();

  // Не добавляем пустую строку
  if (productName === "") {
    return;
  }

  const li = document.createElement("li");
  li.textContent = productName;

  // Нажатие на продукт отмечает его как купленный
  li.addEventListener("click", () => {
    li.classList.toggle("bought");
  });

  list.append(li);

  input.value = "";
  input.focus();
}

button.addEventListener("click", addProduct);

// Добавление продукта клавишей Enter
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addProduct();
  }
});