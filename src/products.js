
export let products = [];

export const addProduct = (product) => {
  products.push(product);
};

export const deleteProduct = (id) => {
  products = products.filter(p => p.id !== id);
};
