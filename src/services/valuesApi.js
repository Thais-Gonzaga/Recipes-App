const valuesApi = (obj, name) => Object.entries(obj)
  .reduce((acc, [key, value]) => (
    value && key.includes(name) ? [...acc, { k: value }] : acc), []);

export default valuesApi;
