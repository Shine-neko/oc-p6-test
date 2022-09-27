const frisby = require('frisby');
const Joi = frisby.Joi;
require('dotenv').config();

it('login success ', () => {
    frisby.post(process.env.API_URL + '/auth/signup', {
        email: "toto1@yopmail.com",
        password: "sdsd"
    });

    return frisby.post(process.env.API_URL + '/auth/login', {
        email: "toto1@yopmail.com",
        password: "sdsd"
    })
        .expect('status', 200)
        .expect('jsonTypes', 'userId', Joi.string())
        .expect('jsonTypes', 'token', Joi.string());
});

it('Login failed', () => {
    return frisby.post(process.env.API_URL + '/auth/login', {
        email: "toto@toto",
        password: "sdsd"
    }).expect('status', 401)
})

it('login with empty body', () => {
    return frisby.post('http://localhost:3000/api/auth/login', {}).expect('status', 400)
})
