import handleError from "./scripts";

const fetchApi = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('No Such Path');
      }
  });
}

const fetchAllData = () => {
  return Promise.all([
    fetchApi('users'),
    fetchApi('recipes'),
    fetchApi('ingredients'),
])
  .catch((error) => handleError(error));
}

export default fetchAllData;