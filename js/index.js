import { products } from './products.js';

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

  if (productsToShow.length === 0) {
    productList.innerHTML = '<p class="no-products">No hay productos que coincidan con los filtros seleccionados.<br>Estos son algunos productos disponibles:</p>';
    const suggestedProducts = showSuggestProducts(3); // Obtén 3 productos aleatorios

    suggestedProducts.forEach(product => {
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
    return;
  }

  productsToShow.forEach(product => {
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
};

const showSuggestProducts = (num) => {
  const productsCopy = [...products];
  const randomProducts = productsCopy.sort(() => 0.5 - Math.random());
  return randomProducts.slice(0, num);
};

showProducts();


const filterByColor = () => {
  const checkboxes = document.querySelectorAll('.filter-modal_content-colors input[type="checkbox"]:checked');
  const selectedColors = Array.from(checkboxes).map(checkbox => checkbox.value);
  return selectedColors;
}
const filterByBrand = () => {
  const checkboxes = document.querySelectorAll('.filter-modal_content-brand input[type="checkbox"]:checked');
  const selectedBrands = Array.from(checkboxes).map(checkbox => checkbox.value);
  return selectedBrands;
}

const applyFilter = () => {
  const selectColors = filterByColor();
  const selectBrands = filterByBrand();
  let filteredProducts = products;

  if (selectColors.length > 0) {
    filteredProducts = products.filter(product => {
        return product.color.some(color => selectColors.includes(color));
      });
    }
  if (selectBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return selectBrands.includes(product.marca);
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
  const colorCheckboxes = document.querySelectorAll('.filter-modal_content-colors input[type="checkbox"]');

  colorCheckboxes.forEach(checkboxes => {
    checkboxes.checked = false;
  });
  const brandCheckboxes = document.querySelectorAll('.filter-modal_content-brand input[type="checkbox"]');

  brandCheckboxes.forEach(checkboxs => {
    checkboxs.checked = false;
  });

  showProducts();

    const modal = document.querySelector('.filter-modal');
    modal.style.display = "none";
}

document.getElementById('limpiar-filtros').addEventListener('click', () => {
  clearFilter();
});

