const express = require('express');
const path = require('path');
const server = express();
const pages = require('./pages.js')
const db = require('./database/db.js')
const bodyParser = require('body-parser')

server
    .use(bodyParser.json())
    .use(express.static('public'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')
    .get('/', pages.index)
    .get('/auth', pages.auth)
    .get('/createuser', pages.createUser)
    .get('/userpage', pages.userpage)
    .get('/cadastro', pages.createUserRender)
    .post('/createuser', pages.createUser)
    .post('/uploadImg', pages.uploadImg)
    .post('/removeImg', pages.remove)
server.listen(5500)