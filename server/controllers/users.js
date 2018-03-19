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
            name     : req.body.name,
            email    : req.body.email,
            password : hash,
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
        .findOne({name:req.body.name})
        .exec()
        .then(data=>{
            let passwordCheck = bcrypt.compareSync(req.body.password, data.password);
            if(passwordCheck){
                let token =jwt.sign({id:data._id,username:data.username,role:data.role},process.env.rahasia)
                res.status(200).json({
                    message : `login success`,
                    data:data,
                    token:token 
                })
            }else{
                res.status(400).json({
                    message:'password incorrect',
                    data:{}
                })
            }
        }).catch(err=>{
            res.status(400).json({
                message:`username incorrect `,
                data:{}
            })
        })
    },
    updateUser: (req,res)=>{
        let id = req.params.id
        user
        .findOneAndUpdate({_id:id},{$set:req.body},{upset:true,new:true})
        .then(data=>{
            res.status(201).json({
                message: 'update user data success',
                data:data
            })
        }).catch(err=>{
            res.status(400).json({
                message:`erorr update data ${err.message}`,
                data: {}
            })
        })
    },
}
