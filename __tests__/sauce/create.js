const frisby = require('frisby');
const path = require('path');
const fs = require('fs');
const login = require('../../hooks/login');
require('dotenv').config();

it('Create sauce without user token', async () => {
    let formData = frisby.formData();
    formData.append('sauce', JSON.stringify({}))

    frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'POST',
        'Content-type': "application/x-www-form-urlencoded",
        body: formData
    }).expect('status', 401)
})

it.only('Create sauce with empty body', async () => {
    const data = await login('toto1@yopmail.com', 'sdsd')
    let formData = frisby.formData();

    return frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'POST',
        'Authorization': "Bearer: " + data.json.token,
        'Content-type': "application/x-www-form-urlencoded",
        body: formData
    })
        .expect('status', 400)
})

it('Create sauce', async () => {
    const data = await login('toto1@yopmail.com', 'sdsd')
    const imagePath = path.resolve(__dirname, './../../fixtures/files/18424726.jpg');

    let formData = frisby.formData();
    let sauce  = {
        name: 'Sauce kipik',
        manufacturer: 'sqdsq',
        description: 'qss',
        mainPepper: 'qsdsqd',
        heat:  3
    };

    formData.append('image', fs.createReadStream(imagePath));
    formData.append('sauce', JSON.stringify(sauce))

    return frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'POST',
        headers: {
            'Authorization': "Bearer: " + data.json.token,
        },
        body: formData
    }).expect('status', 201)
})