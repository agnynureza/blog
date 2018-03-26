<template>
<div>
  <div class="cover-container" id="img">
    <img class="img-fluid" src="../assets/landscape-wallpaper-1080p-For-Desktop-Wallpaper.jpg" alt="">
  </div>
  <div class="container-">
    <div><p>the very first words of my long last letter</p></div>
    <div id="line" style=""></div>
  </div>
  <div class="container">
  <div class="row">
    <div class="col-md-8">
      <div class="tab-content" id="nav-tabContent">
          <router-view></router-view>
      </div>
    </div>
    <div class="col-md-3">
      <h3>Article</h3>
      <br/>
      <ul v-for="(article,i) in articles" :key='i'>
        <li class="text-left"><router-link :to="{name:'content',params:{id:article._id}}">
        {{article.title}}
        </router-link></li>
      </ul>
    </div> 
  </div>
 </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
 name:'home',
 data: function(){
  return {
   articles: [],
   content:''
	 }
  },
	created: function(){
	 axios.get('http://localhost:3000/users/show').then(data=>{
    this.articles = data.data.data
    })
  },
  updated: function(){
    axios.get('http://localhost:3000/users/show').then(data=>{
    this.articles = data.data.data
    })
  }
}

</script>

<style>
#img{
  margin:0px;
  padding:0px;

}
p{
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
.container-{
  text-align: center;
  font-weight: bold;
  opacity: 0.75;
  font-size: 1em;
  padding-bottom: 5px;
  margin-top:30px;
  margin-bottom:50px;
  letter-spacing: 1px;
}
#line{
  margin: auto;
  width: 30px;
  height: 3px;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.2
}
</style>
