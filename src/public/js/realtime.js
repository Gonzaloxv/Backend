
const socket = io();
const list = document.getElementById("productList");

socket.on("updateProducts", products => {
  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `<li>${p.id} - ${p.title} - $${p.price}</li>`;
  });
});

document.getElementById("productForm").addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("addProduct", {
    title: title.value,
    price: price.value
  });
});

document.getElementById("deleteForm").addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("deleteProduct", id.value);
});
