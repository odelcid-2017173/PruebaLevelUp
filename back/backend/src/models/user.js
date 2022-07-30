'use strict'

const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: String,
    address: String,
    gender: String,
    number: String, 
    date: String,
    student: String,
    enrollmentDate: Date,
    carne: String,
    poetry: String

})

module.exports = mongoose.model('User', userModel)