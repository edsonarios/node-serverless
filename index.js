const serverless = require('serverless-http')
const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
const roleRoutes = require('./routes/role')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoutes)
app.use('/roles', roleRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

module.exports.handler = serverless(app)
