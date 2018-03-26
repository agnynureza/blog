<template>
<div>
  <div>
    <label for="exampleFormControlInput1">Title</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="title" name="title">
  </div>
  <div>
    <label for="exampleFormControlTextarea1">Content</label>
    <vue-editor v-model="content"></vue-editor>
  </div>
  <router-link :to="{name:'home'}">
    <button style="margin-top: 20px;" type="submit" class="btn btn-primary" @click="addArticle">Submit Article</button>
  </router-link>
  
</div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
 components: {
      VueEditor
   },
 data : function() {
   return {
     title: ``,
     content: ``
   }
 },

 methods : {
   addArticle : function() {
     axios.post('http://localhost:3000/users/create',{
       title: this.title,
       content: this.content
     })
   }
 }
}


</script>

<style>

</style>
