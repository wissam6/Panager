const passwordController = require('../controllers/passwordController.js');

const router = require('express').Router();

router.post('/addPassword', passwordController.addPassword);

module.exports = router;
