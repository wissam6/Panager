const passwordController = require('../controllers/productController.js');

const router = require('express').Router();

router.post('/addPassword', passwordController.addPassword);
