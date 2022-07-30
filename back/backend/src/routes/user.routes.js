'use strict'

const userController = require('../controllers/user.controller');
const express = require('express');
const api = express.Router();

api.get('/test', userController.test);

api.post('/form', userController.registerForm);
api.get('/getForm', userController.getForms)

module.exports = api;