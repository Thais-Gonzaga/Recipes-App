export const getLocalStore = (key) => JSON.parse(localStorage.getItem(key));

export const add = (key, item) => {
  // console.log(item);
  const current = getLocalStore(key) || [];
  const newItem = [...current, item[0]];
  const data = JSON.stringify(newItem);
  localStorage.setItem(key, data);
};

export const remove = (key, idSelect) => {
  const current = getLocalStore(key) || [];
  const newItem = current.filter(({ id }) => id !== idSelect);
  const data = JSON.stringify(newItem);
  localStorage.setItem(key, data);
};
