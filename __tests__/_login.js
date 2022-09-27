const frisby = require("frisby");
module.exports = (email, password) => {
    return frisby.post(process.env.API_URL + '/auth/login', {
        email: email,
        password: password
    })
};

