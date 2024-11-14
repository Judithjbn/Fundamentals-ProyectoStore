import { products } from './products.js'

document.getElementById('filter-btn').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
});

document.getElementById('close-filter').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = "none";
});


const showProducts = () => {
  const productList = document.querySelector('.products-list');
  productList.innerHTML = '';

  products.forEach (product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <div class="product-image">
        <img src="${product.imagen}" alt="${product.nombre}">
      </div>
      <div class="product-info">
        <h2>${product.nombre}</h2>
        <p>Marca: ${product.marca}</p>
        <p>Color: ${product.color.join(', ')}</p>
        <p class="product-price">${product.precio}€</p>
      </div>
    `;
    productList.appendChild(productElement);

  });


}

showProducts();