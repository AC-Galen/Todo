const express = require('express')
const session = require('express-session')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const routes = require('./routes')

const userPassport = require('./config/passport')
const res = require('express/lib/response')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.use(session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended:true }))

app.use(methodOverride('_method'))

userPassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') //設定success_msg訊息
  res.locals.warning_msg = req.flash('warning_msg') //設定warning_msg訊息
  next()
})

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})