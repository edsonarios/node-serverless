const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const loginRoutes = require('./routes/login')
const userRoutes = require('./routes/user')
const roleRoutes = require('./routes/role')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const meRoutes = require('./routes/me')
const { requireRoles, authenticate } = require('./middlewares/authenticate')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', loginRoutes)
app.use('/users', authenticate, requireRoles(['admin']), userRoutes)
app.use('/roles', authenticate, requireRoles(['admin']), roleRoutes)
app.use('/posts', authenticate, requireRoles(['admin']), postRoutes)
app.use('/comments', authenticate, requireRoles(['admin']), commentRoutes)
app.use('/me', authenticate, requireRoles(['personal']), meRoutes)

module.exports = app
