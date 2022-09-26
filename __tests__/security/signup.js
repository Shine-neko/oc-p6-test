const frisby = require('frisby');

let random = (Math.random() + 1).toString(36).substring(7);

it('Register success ', function () {
    const randomEmail = random + "@yopmail.com";

    return frisby.post(process.env.API_URL + '/auth/signup', {
        email: randomEmail,
        password: "azerty123"
    }).expect('status', 201)
});

it('duplicate email', function () {
    const randomEmail = random + "@yopmail.com";

    frisby.post(process.env.API_URL + '/auth/signup', {
        email: randomEmail,
        password: "azerty123"
    })

    return frisby.post(process.env.API_URL + '/auth/signup', {
        email: randomEmail,
        password: "azerty123"
    }).expect('status', 400)
});

it('email invalid', function () {
    return frisby.post(process.env.API_URL + '/auth/signup', {
        email: "test",
        password: "azerty123"
    }).expect('status', 400)
});

it('signup with empty body', () => {
    return frisby.post(process.env.API_URL + '/auth/signup', {}).expect('status', 400)
})
