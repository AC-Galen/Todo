const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
//若在 Heroku 環境中使用process.nev.PORT，否則在本地環境(3000)
const PORT = process.env.PORT || 3000

const routes = require('./routes')
require('./config/mongoose')


const app = express()

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended:true }))

app.use(methodOverride('_method'))

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})