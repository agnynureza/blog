const express = require('express');
const router = express.Router();
const {signUp,signIn,updateUser} = require('../controllers/users');
const {createArticle,showArticles,editArticle,deleteArticle} = require('../controllers/articles');
const {auth} = require('../middleware/auth')

//User
router.post('/signup',signUp)
router.post('/signin',signIn)
router.put('/update/:id',auth,updateUser)

//User/Articles
router.post('/create',auth,createArticle)
router.get('/show/:id',auth,showArticles)
router.put('/edit/:id',auth,editArticle)
router.delete('/delete/:id',auth,deleteArticle)



module.exports = router