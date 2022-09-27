const frisby = require('frisby');
const path = require('path');
const login = require('../_login');
require('dotenv').config();

it('Create sauce with user token', async () => {
    const imagePath = path.resolve(__dirname, './../../fixtures/files/18424726.jpg');

    let formData = frisby.formData();
    formData.append('imageUrl', imagePath)
    formData.append('name', 'sdsd');
    formData.append('manufacturer', 'sqdsqdsq');
    formData.append('description', 'qss');
    formData.append('mainPepper', 'qsdsqd');
    formData.append('heat',  3);

    frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'POST',
        'Content-type': "application/x-www-form-urlencoded",
        body: formData
    }).expect('status', 401)
})

it('Create sauce with empty body', async () => {
    await login('toto1@yopmail.com', 'sdsd')
        .then(data => {
            let formData = frisby.formData();

            frisby.fetch(process.env.API_URL + '/sauces', {
                method: 'POST',
                'Authorization': "Bearer: " + data.json.token,
                'Content-type': "application/x-www-form-urlencoded",
                body: formData
            }).expect('status', 400)
        })
})

it('Create sauce', async () => {
    login('toto1@yopmail.com', 'sdsd')
        .then(data => {

            const imagePath = path.resolve(__dirname, './../../fixtures/files/18424726.jpg');

            let formData = frisby.formData();
            formData.append('imageUrl', imagePath)
            formData.append('name', 'sdsd');
            formData.append('manufacturer', 'sqdsqdsq');
            formData.append('description', 'qss');
            formData.append('mainPepper', 'qsdsqd');
            formData.append('heat',  3);

            frisby.fetch(process.env.API_URL + '/sauces', {
                method: 'POST',
                'Authorization': "Bearer: " + data.json.token,
                'Content-type': "application/x-www-form-urlencoded",
                body: formData
            }).expect('status', 201)
        })
})