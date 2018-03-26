<template>
<div>
  <h3>{{content.title}}</h3>
  <br/>
  <div class="row" style="margin-bottom:20px; margin-top:20px;">
    <div class="col-md-1" v-if="check">
      <router-link :to="{name:'home'}">
        <button type="submit" class="btn btn-secondary" @click="deleteContent"><i class="fas fa-trash-alt"></i></button>
      </router-link>
    </div>
    <div class="col-md-1" v-if="check">
      <router-link :to="{name:'edit',params:{id:content._id}}" >
        <button type="submit" class="btn btn-secondary"><i class="fas fa-edit"></i></button>
      </router-link>
    </div>
  </div>
  <p class="text-left" v-html="content.content"></p>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
props:['id'],
  data: function(){
    return {
    content:'',
    check : false
    }
  },
  methods:{
    getContent: function(){
      this.check = localStorage.getItem('status')
      axios.get(`http://localhost:3000/users/shows/${this.id}`).then(data=>{
        this.content = data.data.data
      })
    },
    deleteContent: function(){
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`http://localhost:3000/users/delete/${this.id}`)
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  },
 created: function(){
	 this.getContent()
  },
  watch:{
    id(){
      this.getContent()
    }
  }
}
</script>

<style>

</style>
