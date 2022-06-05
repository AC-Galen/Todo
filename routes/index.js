const express = require('express')
const router = express.Router()
const todos = require('./modules/todos')
const home = require('./modules/home')
const users = require('./modules/users')

//將網址結構符合的字串 導向模組
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

//匯出路由器
module.exports = router