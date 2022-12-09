const requestApi = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};
export default requestApi;
