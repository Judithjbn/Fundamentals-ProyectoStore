//import { products } from '/products.js';
// const productsList = document.querySelector(".products-list");

document.getElementById('filter-btn').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
});

document.getElementById('close-filter').addEventListener('click', () => {
  const modal = document.querySelector('.filter-modal');
  modal.style.display = "none";
});