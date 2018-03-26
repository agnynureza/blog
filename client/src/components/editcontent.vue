<template>
  <div>
  <div>
    <label for="exampleFormControlInput1">Title</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" v-model=content.title value="content.title">
  </div>
  <div>
    <label for="exampleFormControlTextarea1">Content</label>
    <vue-editor v-model=content.content></vue-editor>
  </div>
  <router-link :to="{name:'home'}">
    <button style="margin-top: 20px;" type="submit" class="btn btn-primary" @click="updateContent" >Submit Article</button>
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
  data: function(){
    return {
      title: '',
      content: ''
    }
  },
  methods:{
    updateContent:function(){
      axios.put(`http://localhost:3000/users/edit/${this.$route.params.id}`,{
        title : this.content.title,
        content : this.content.content
      })
    }
  },
  created:function(){
     axios.get(`http://localhost:3000/users/shows/${this.$route.params.id}`).then(data=>{
        this.content = data.data.data
      })
  }
}
</script>

<style>

</style>
