const article = require('../models/articles')


module.exports = {
    createArticle:(req,res)=>{
        article
        .create({
            title   : req.body.title,
            content : req.body.content,
            user_id : req.body.user_id
        },(err,data)=>{
            if(err){
                res.status(500).json({
                    message : 'failed create user',
                    data:{}
                })
            }else{
                res.status(201).json({
                    message : 'create article success',
                    data:data
                })
            }
        })
    },
    showArticles : (req,res)=>{
        let id = req.params.id
        article
        .find({user_id:id})
        .populate('user_id')
        .exec()
        .then(data=>{
            res.status(200).json({
                message : 'success show article data',
                data:data
            })
        }).catch(err=>{
            res.status(400).json({
                message : `sorry error load articles data `,
                data: {}
            })
        })
    },
    editArticle: (req,res)=>{
        let id = req.params.id
        article
        .findOneAndUpdate({user_id:id},{$set:req.body},{upset:true,new:true})
        .then(data=>{
            res.status(201).json({
                message: 'update article success',
                data:data
            })
        }).catch(err=>{
            res.status(400).json({
                message:`erorr update article ${err.message}`,
                data: {}
            })
        })
    },
    deleteArticle:(req,res)=>{
        let id = req.params.id
        article
        .deleteOne({_id:id})
        .then(data=>{
            res.status(201).json({
                message :'delete article success',
                data: data
            })
        })
    },
}
