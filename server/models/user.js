"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {
        type: String,
        minlegth: 3,
        required: true,
        unique: true,
        message: 'username must be at least 3 characters long and unique',
    },
    name: String,
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
    ],
});
userSchema.set('toJSON', {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});
module.exports = mongoose.model('User', userSchema);
