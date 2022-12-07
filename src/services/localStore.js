const localStoreItem = (key, item) => {
  const current = JSON.parse(localStorage.getItem(key)) || [];
  const newItem = [...current, item[0]];
  const data = JSON.stringify(newItem);
  localStorage.setItem(key, data);
};

export default localStoreItem;
