// const userPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users');
// const recipePromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes');
// const ingredientPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients');
// const fetchPromises = [userPromise, recipePromise, ingredientPromise]
import handleError from "./scripts";

// const apiCalls = () => {
//     return Promise.all(fetchPromises)
//         .then(responses => {
//             const jsonPromises = responses.map(response => response.json())
//             return Promise.all(jsonPromises)
//                 .then(allData => allData)
//         })
// }

const fetchApi = (url) => {
    return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${url}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
               throw new Error('No Such Path');
            }
        })
}

const fetchAllData = () => {
    return Promise.all([
        fetchApi('users'),
        fetchApi('recipes'),
        fetchApi('ingredients'),
    ])
    .catch((error) => console.log(error))
}


export default fetchAllData;
