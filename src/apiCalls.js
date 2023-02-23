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

const postFavorite = (userID, recipeID) => {
  return fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
    body: JSON.stringify({userID: userID, recipeID: recipeID}), 
    headers: {
     'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if(!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(json => json)
    .catch(err => console.log(err));
}

export {fetchAllData, postFavorite, fetchApi};
