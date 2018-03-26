const bcrypt     = require('bcrypt')
const saltRounds = 10
const jwt        = require('jsonwebtoken')
const salt       = bcrypt.genSaltSync(saltRounds);
const user = require('../models/users')

module.exports = {
    signUp:(req,res)=>{
        const hash = bcrypt.hashSync(req.body.password, salt);
        user
        .create({
            username : req.body.username,
            password : hash
        },(err,data)=>{
            if(err){
                res.status(500).json({
                    message : 'failed create user',
                    data:{}
                })
            }else{
                res.status(201).json({
                    message : 'create user success',
                    data:data
                })
            }
        })
    },
    signIn:(req,res)=>{
        user
        .findOne({username:req.body.username})
        .exec()
        .then(data=>{
            let passwordCheck = bcrypt.compareSync(req.body.password, data.password);
            if(passwordCheck){
                let token =jwt.sign({id:data._id,username:data.username,role:data.role},process.env.rahasia)
                res.status(200).json({
                    message : `login success`,
                    data:data,
                    isLogin : true
                })
            }else{
                res.status(401).json({
                    message:'password incorrect',
                    data:{}
                })
            }
        }).catch(err=>{
            console.log(err)
            res.status(400).json({
                message:`username incorrect `,
                data:{}
            })
        })
    }
}
