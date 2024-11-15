import { products } from './products.js'

document.getElementById('filter-btn').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
});

document.getElementById('close-filter').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = "none";
});


const showProducts = (productsToShow = products) => {
  const productList = document.querySelector('.products-list');
  productList.innerHTML = '';

  productsToShow.forEach (product => {
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


const filterByColor = () => {
  const checkboxes = document.querySelectorAll('.filter-modal_content-colors input[type="checkbox"]:checked');
  const selectedColors = Array.from(checkboxes).map(checkbox => checkbox.value);
  return selectedColors;
}
const applyFilter = () => {
  const selectColors = filterByColor();
  let filteredProducts = products;

  if (selectColors.length > 0) {
    filteredProducts = products.filter(product => {
        return product.color.some(color => selectColors.includes(color));
      });
    }
  showProducts(filteredProducts);

  const modal = document.querySelector('.filter-modal');
  modal.style.display = "none";
};


document.getElementById('aplicar-filtros').addEventListener('click', () => {
  applyFilter();
});

const clearFilter = () => {
  const checkboxes = document.querySelectorAll('.filter-modal_content-colors input[type="checkbox"]');

  checkboxes.forEach(checkboxes => {
    checkboxes.checked = false;
  });
  showProducts();

    const modal = document.querySelector('.filter-modal');
    modal.style.display = "none";
}

document.getElementById('limpiar-filtros').addEventListener('click', () => {
  clearFilter();
});

