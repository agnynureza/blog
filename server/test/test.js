const chai      = require('chai')
const expect    = chai.expect
const chaiHttp  = require('chai-http')
const app       = require('../app')

chai.use(chaiHttp)

var token = ''
var userId = ''
var articleId = ''

describe('API /users ',()=>{
    //SIGNUP 
    describe('Post /users',()=>{
        it('create user',done=>{
            chai.request(app)
            .post('/users/signup')
            .send({
                name    : 'reza',
                email   : 'reze@gmail.com',
                password: '123345'
            })
            .end((err,res)=>{
                userId = res.body.data._id 
                expect(res).to.have.status(201)
                expect(res.body.message).to.be.a('string').eql('create user success')
                expect(res.body).to.be.an('object')
                expect(res.body.data).to.ownProperty('email')
                expect(res.body.data).to.ownProperty('password')
                expect(res.body.data).to.ownProperty('name')
                done()
            })
        })
    })
    //SIGNIN
    describe('Post /users',()=>{
        it('signin user',done=>{
            chai.request(app)
            .post('/users/signin')
            .send({
                name    : 'reza',
                email   : 'reze@gmail.com',
                password: '123345'
            })
            .end((err,res)=>{
                token = res.body.token
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.a('string').eql('login success')
                expect(res.body).to.be.an('object')
                expect(res.body).to.ownProperty('token')
                expect(res.body.data).to.ownProperty('email')
                expect(res.body.data).to.ownProperty('password')
                expect(res.body.data).to.ownProperty('name')
                done()
            })
        })
    })
    //UPDATE DATA USER
    describe('Put /users',()=>{
        it('update users by Id',done=>{
            chai.request(app)
            .put(`/users/update/${userId}`)
            .set('token', token)
            .send({
                name    :'siti',
                password:'23456',
                email   :'siti@gmail.com'
            })
            .end((err,res)=>{
                expect(res).to.have.status(201)
                expect(res.body.message).to.be.a('string').eql('update user data success')
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })
    //Create Articles
    describe('Post /users/create',()=>{
        it('create article',done=>{
            chai.request(app)
            .post('/users/create')
            .set('token', token)
            .send({
                title : 'beli buku',
                content:'lorem ipsum lorem makan ipsum soalnya lagi laper',
                user_id : userId  
            })
            .end((err,res)=>{
                articleId = res.body.data._id
                expect(res).to.have.status(201)
                expect(res.body.message).to.be.a('string').eql('create article success')
                expect(res.body).to.be.an('object')
                expect(res.body.data).to.ownProperty('title')
                expect(res.body.data).to.ownProperty('user_id')
                done()
            })
        })
    })
    //show Article by userid (HOMEPAGE USER)
    describe('Get /users/show',()=>{
        it('show user article',done=>{
            chai.request(app)
            .get(`/users/show/${userId}`)
            .set('token', token)
            .end((err,res)=>{
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.a('string').eql('success show article data')
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })
    //Update article by userid
    describe('Put /users/edit',()=>{
        it('update users by Id',done=>{
            chai.request(app)
            .put(`/users/edit/${userId}`)
            .set('token', token)
            .set('token', token)
            .send({
                title    : 'akhir dari kerajaan mesir',
                content  : 'berakit-rakit kehulu berenang-renang ketepian'
            })
            .end((err,res)=>{
                expect(res).to.have.status(201)
                expect(res.body.message).to.be.a('string').eql('update article success')
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })
    describe('Delete /users/delete',()=>{
        it('delete article',done=>{
            chai.request(app)
            .delete(`/users/delete/${articleId}`)
            .set('token', token)
            .end((err,res)=>{
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                done()
            })
        })
    })
})
