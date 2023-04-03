import handleError from "./scripts";

const fetchApi = (url) => {
  return fetch(`https://whats-cookin-api.vercel.app/api/v1/${url}`)
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
    fetchApi('ingredients')
])
  .catch((error) => handleError(error));
}

const updateFavorite = (userID, recipeID, method) => {
  return fetch('https://whats-cookin-api.vercel.app/api/v1/', {
    method: method,
    body: JSON.stringify({userID: userID, recipeID: recipeID}), 
    headers: {
     'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(err => handleError(err));
}

export {fetchAllData, updateFavorite};
