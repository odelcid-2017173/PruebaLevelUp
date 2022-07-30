'use strict'

const User = require('../models/user');

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `Param ${key} is required\n`;
    }
    return msg.trim();
}
