<template>
 <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">FictionBlog</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><router-link :to="{name:'home'}">Home</router-link></li>
        <li v-if="isLogin == true"><router-link :to="{name:'create'}">Create Article</router-link></li>
        <li><router-link :to="{name:'profile'}" >errr....me ?</router-link></li>
      </ul>
      <div id="signin" class="navbar-form navbar-right" v-if="isLogout === true">
        <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input type="text" class="form-control" v-model="username" placeholder="Username">                                        
        </div>
        <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
          <input type="password" class="form-control" v-model="password" placeholder="Password">                                        
        </div>
        <button type="submit" class="btn btn-primary" @click="login">Login</button> 
      </div>
       <div class="navbar-form navbar-right"  v-if="isLogin === true">
          <button type="button" class="btn btn-danger" @click="logout">Logout</button>
        </div>
    </div>
  </div>
</nav>
</template>

<script>
import routes from '@/router'
import axios from 'axios'
export default {
name: 'navbar',
 data : function(){
  return{
    isLogin  : false,
    isLogout: true
   }
 },
 created () {
   const status = localStorage.getItem('status')
   if(status){
     this.isLogin = true
     this.isLogout = false
   }else{
     this.isLogin = false
     this.isLogout = true
   }
 },
 methods:{
   login: function(){
    //  alert('haalooo')
     axios.post('http://localhost:3000/users/signin',{
       username : this.username,
       password : this.password 
     }).then(data=>{
       this.isLogin = true
       this.isLogout = false
       let status = localStorage.setItem('status',true)
       routes.push({
       path: '/'
     })
     })
   },
   logout : function(){
     this.isLogin = false 
     this.isLogout = true
     localStorage.removeItem('status')
     routes.push({
       path: '/'
     })
   }
 }
}
</script>

<style>

</style>
