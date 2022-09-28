const frisby = require('frisby');
const Joi = frisby.Joi;
const path = require('path');
const login = require('../_login');
require('dotenv').config();

it('List sauces with anonymous user', async () => {
    return await frisby.get(process.env.API_URL + '/sauces')
        .expect('status', 401);
})

it('List sauces with user', async () => {
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
