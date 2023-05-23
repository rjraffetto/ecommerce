// Datos de ejemplo
const products = [
    {
      name: "Producto 1",
      description: "Descripción del producto 1",
      category: "electronics",
      price: 10.99,
      image: "product1.jpg",
    },
    {
      name: "Producto 2",
      description: "Descripción del producto 2",
      category: "clothing",
      price: 19.99,
      image: "product2.jpg",
    },
    {
      name: "Producto 3",
      description: "Descripción del producto 3",
      category: "furniture",
      price: 7.99,
      image: "product3.jpg",
    },
  ];
  
  // Variable para almacenar los productos seleccionados
  let selectedProducts = [];
  
  // Función para generar la vista de los productos
  function renderProducts(filteredProducts = products) {
    const productsSection = document.getElementById("products");
    productsSection.innerHTML = "";
  
    filteredProducts.forEach((product) => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);
    });
  }
  
  // Función para crear el elemento de producto
  function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
  
    const imageElement = document.createElement("img");
    imageElement.src = product.image;
  
    const productContent = document.createElement("div");
    productContent.classList.add("product-content");
  
    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;
  
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;
  
    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
  
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Agregar al carrito";
    addToCartButton.classList.add("button", "add-to-cart-button");
  
    addToCartButton.addEventListener("click", () => {
      addToCart(product);
      showTotalPrice();
      renderCart();
    });
  
    productContent.appendChild(nameElement);
    productContent.appendChild(descriptionElement);
    productContent.appendChild(priceElement);
    productContent.appendChild(addToCartButton);
  
    productElement.appendChild(imageElement);
    productElement.appendChild(productContent);
  
    return productElement;
  }
  
  // Función para agregar un producto al carrito
  function addToCart(product) {
    selectedProducts.push(product);
  }
  
  // Función para remover un producto del carrito
  function removeFromCart(index) {
    selectedProducts.splice(index, 1);
  }
  
  // Función para renderizar el carrito
  function renderCart() {
    const cartSection = document.getElementById("cart");
    const totalPriceElement = document.getElementById("total-price");
  
    cartSection.innerHTML = "";
    totalPriceElement.textContent = "";
  
    if (selectedProducts.length === 0) {
      cartSection.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
      const cartList = document.createElement("ul");
  
      selectedProducts.forEach((product, index) => {
        const cartItem = document.createElement("li");
        const removeButton = document.createElement("button");
  
        cartItem.textContent = product.name;
  
        removeButton.textContent = "Remover";
        removeButton.classList.add("button", "remove-from-cart-button");
  
        removeButton.addEventListener("click", () => {
          removeFromCart(index);
          renderCart();
          showTotalPrice();
        });
  
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
      });
  
      cartSection.appendChild(cartList);
    }
  }
  
  // Función para calcular y mostrar el precio total de la compra
  function showTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    const totalPrice = selectedProducts.reduce(
      (total, product) => total + product.price,
      0
    );
  
    totalPriceElement.textContent = `Precio total: $${totalPrice.toFixed(2)}`;
  }
  
  // Función para filtrar los productos
  function filterProducts() {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
  
    const selectedCategory = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);
  
    const filteredProducts = products.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
  
      if (maxPrice && product.price > maxPrice) {
        return false;
      }
  
      return true;
    });
  
    renderProducts(filteredProducts);
  }
  
  // Cargar los productos al cargar la página
  window.addEventListener("load", () => {
    renderProducts();
    showTotalPrice();
    renderCart();
  
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
  
    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("input", filterProducts);
  });
  