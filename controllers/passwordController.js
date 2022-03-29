const db = require('../models');

//create main model
const Password = db.password;

//main work

//1.create password

const addPassword = (req,res) => {
    let info = {
        websiteName: 'kfc',
        emailOrUsername: 'wissam_6',
        password: '123',
        userId: 1

        //websiteName: req.body.website_name,
        //emailOrUsername: req.body.emailOrUsername,
        //password:req.body.password,
        //userId: sessionData.user.id
    };

    const password = Password.create(info);
    res.status(200).send(password);
    console.log(password);

}

module.exports = {
    addPassword
};