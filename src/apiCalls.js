const getUsers = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
        .then(response => response.json())
        .then(users => users.usersData)
        .catch(err => console.log('epic fail: ', err))
}

export default getUsers;
