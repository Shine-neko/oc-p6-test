const login = require('../../hooks/login');
const sauce_hook = require('../../hooks/sauce');
const frisby = require('frisby');
require('dotenv').config();

const random_string = () => {
    return (Math.random() + 1).toString(36).substring(7);
}

it('Update name sauce', async () => {

    const toto3 = await login('toto3@yopmail.com', 'sdsd');

    const sauce = await sauce_hook(random_string(), toto3.json.token);
    sauce.name = random_string();

    let formData = frisby.formData();
    formData.append('sauce', JSON.stringify(sauce))

    await frisby.fetch(process.env.API_URL + '/sauces/'+sauce._id, {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer: " + toto3.json.token,
        },
        body: formData
    }).expect('status', 200)

})

it('Update name sauce with bad user', async () => {
    const toto4 = await login('toto4@yopmail.com', 'sdsd');
    const toto5 = await login('toto5@yopmail.com', 'sdsd');

    const sauce = await sauce_hook(random_string(), toto4.json.token);
    sauce.name = random_string();

    let formData = frisby.formData();
    formData.append('sauce', JSON.stringify(sauce))

    await frisby.fetch(process.env.API_URL + '/sauces/'+sauce._id, {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer: " + toto5.json.token,
        },
        body: formData
    }).expect('status', 403)

})