const frisby = require("frisby");
const fs = require("fs");
const path = require("path");

module.exports = async (name, token) => {
    let sauce = {
        name: name,
        manufacturer: 'sqdsq',
        description: 'qss',
        mainPepper: 'qsdsqd',
        heat: 3
    };

    const imagePath = path.resolve(__dirname, './../fixtures/files/18424726.jpg');

    let formData = frisby.formData();

    formData.append('image', fs.createReadStream(imagePath));
    formData.append('sauce', JSON.stringify(sauce))

   await frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'POST',
        headers: {
            'Authorization': "Bearer: " + token,
        },
        body: formData
    })

   const _create = await frisby.fetch(process.env.API_URL + '/sauces', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer: " + token
        }
   }).then(data => {
       return data.json.find(sauce => sauce.name === name);
   })

    return _create;
};
