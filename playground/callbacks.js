const getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Jordi'
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(41, (user) => {
    console.log(user);
});
