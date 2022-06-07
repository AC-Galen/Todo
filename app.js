const express = require('express')
const session = require('express-session')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const userPassport = require('./config/passport')
const res = require('express/lib/response')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.use(session ({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended:true }))

app.use(methodOverride('_method'))

userPassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})