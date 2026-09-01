const express = require('express')
const router = express.Router()
const auth = require('./controllers/auth')
const news = require('./controllers/news')
const users = require('./controllers/users')

router.post('/auth/login', auth.login)
router.get('/news', news.list)
router.get('/news/:id', news.get)
router.post('/news', auth.requireAuth, news.create)
router.put('/news/:id', auth.requireAuth, news.update)
router.delete('/news/:id', auth.requireAuth, news.remove)

// Users
router.get('/users', auth.requireAuth, users.list)
router.get('/users/:id', auth.requireAuth, users.get)
router.post('/users', auth.requireAuth, users.create)
router.put('/users/:id', auth.requireAuth, users.update)
router.delete('/users/:id', auth.requireAuth, users.remove)

module.exports = router
