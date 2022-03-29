const db = require('../models');

//create main model
const Password = db.passwords;

//main work

//1.create password

const addPassword = async (req,res) => {
    let info = {
        websiteName: req.body.website_name,
        emailOrUsername: req.body.emailOrUsername,
        password:req.body.password,
        userId: sessionData.user.id
    };

    const password = await Password.create(info);
    res.status(200).send(password);
    console.log(password);

}

module.exports = {
    addPassword
};