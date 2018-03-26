const express = require('express');
const router = express.Router();
const {signIn,signUp} = require('../controllers/users');
const {createArticle,showArticles,editArticle,deleteArticle,showContent} = require('../controllers/articles');
// const {auth} = require('../middleware/auth')

//User
router.post('/signup',signUp)
router.post('/signin',signIn)



//User/Articles
router.post('/create',createArticle)
router.get('/show',showArticles)
router.get('/shows/:id',showContent)
router.put('/edit/:id',editArticle)
router.delete('/delete/:id',deleteArticle)



module.exports = router