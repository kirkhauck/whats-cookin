const userPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users');
const recipePromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes');
const ingredientPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients');
let fetchPromises = [userPromise, recipePromise, ingredientPromise]

const apiCalls = () => {
    return Promise.all(fetchPromises)
        .then(responses => {
            const jsonPromises = responses.map(response => response.json())
            return Promise.all(jsonPromises)
                .then(allData => allData)
        })
}

export default apiCalls;
