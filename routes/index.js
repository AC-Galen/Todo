const express = require('express')
const router = express.Router()
const todos = require('./modules/todos')
const home = require('./modules/home')

//將網址結構符合的字串 導向模組
router.use('/', home)
router.use('/todos', todos)

//匯出路由器
module.exports = router