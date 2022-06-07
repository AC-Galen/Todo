const express = require('express')
const router = express.Router()
const todos = require('./modules/todos')
const home = require('./modules/home')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') //導入驗證程序


router.use('/todos', authenticator, todos) //利用 authenticator 驗證程序
router.use('/users', users)
router.use('/', authenticator, home) //利用authenticator驗證程序

module.exports = router