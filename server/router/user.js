const express = require('express');
const Router = express.Router();
const user  = require('../bean/user');
const { validate } = require('express-validation');
const userParams = require('../params/user')

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        console.log
        cb(null, file.originalname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });



Router.route('/create')
.post(validate(userParams.userParams.createUser), user.createUser)

Router.route('/upload')
.post( upload.fields([{ name: 'userPanCard', maxCount: 1 }, { name: 'userAdharCard', maxCount: 1 }]), user.uploadDocuments)

 
module.exports = Router;
