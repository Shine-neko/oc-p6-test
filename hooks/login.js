const frisby = require("frisby");
module.exports = (email, password) => {

    frisby.post(process.env.API_URL + '/auth/signup', {
        email: email,
        password: password
    })

    return frisby.post(process.env.API_URL + '/auth/login', {
        email: email,
        password: password
    })
};

