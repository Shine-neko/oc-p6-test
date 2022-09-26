const frisby = require('frisby');
const Joi = frisby.Joi;
require('dotenv').config();

it('login success ', () => {

    return frisby.post(process.env.API_URL + '/auth/login', {
        email: "toto1@yopmail.com",
        password: "sdsd"
    }).inspectJSON().expect('status', 200)
});

it('Login failed', () => {
    return frisby.post(process.env.API_URL + '/auth/login', {
        email: "toto@toto",
        password: "sdsd"
    }).expect('status', 400)
})

it('login with empty body', () => {
    return frisby.post('http://localhost:3000/api/auth/login', {}).expect('status', 400)
})
