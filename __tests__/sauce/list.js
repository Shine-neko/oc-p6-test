const frisby = require('frisby');
const Joi = frisby.Joi;
const path = require('path');
require('dotenv').config();

const login = (email, password) => {
    return frisby.post(process.env.API_URL + '/auth/login', {
        email: email,
        password: password
    })
};

it('List sauces with anonymous user', async () => {
    return await frisby.get(process.env.API_URL + '/sauces')
        .expect('status', 401);
})

it('List sauces with anonymous with user', async () => {
    const data = await login("toto1@yopmail.com", 'sdsd')

    await frisby.fetch(process.env.API_URL + '/sauces', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer: " + data.json.token
        }
    })
        .expect('status', 200)
        .expect('jsonTypes', '*', {
           _id: Joi.string(),
           userId:Joi.string(),
           name:Joi.string(),
           manufacturer :Joi.string(),
           description: Joi.string(),
           mainPepper: Joi.string(),
           imageUrl: Joi.string(),
           heat: Joi.number(),
           likes: Joi.number(),
           dislikes:Joi.number(),
           usersLiked : Joi.array(),
           usersDisliked : Joi.array(),
           __v: Joi.number()
        })
})

it('Create sauce', async () => {
    await login('toto1@yopmail.com', 'sdsd')
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