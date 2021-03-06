const
  express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./db'),
  seed = require('./seed'),
  port = process.env.PORT || 2020,
  session = require('express-session'),
  passport = require('passport')

if (process.env.NODE_ENV !== 'production') require('../secrets')
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.User.findById(id)
    .then(user => done(null, user))
    .catch(done))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')))

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'foo',
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))

app.use('/api', require('./api/api.router'))

const indexPath = path.join(__dirname, '..', 'public', 'index.html')
app.get('*', (req, res, next) => res.sendFile(indexPath))

app.use((req, res, next) => {
  const error = new Error('page not found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    return res.status(err.status).send({error: {message: err.message}})
  }
  return res.status(err.status || 500).send(err)
})

db.sync()
  .then(() => seed())
  .then(() => {
    console.log('db synced')
    app.listen(port, () => console.log(`listening on port ${port}`))
  })

module.exports = app
