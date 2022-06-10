const express = require('express')
const router = express.Router()

const todos = require('./modules/todos')
const home = require('./modules/home')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')   // 引用模組


router.use('/todos', authenticator, todos) 
router.use('/users', users)
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, home) 

module.exports = router