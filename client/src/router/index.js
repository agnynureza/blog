import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import content from '@/components/content'
import create from '@/components/create'
import profile from '@/components/profile'
import edit from '@/components/editcontent'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'home',
      component: home,
      children: [{
        path: 'content/:id',
        name: 'content',
        component: content,
        props: true
      },{
        path: 'create',
        name: 'create',
        component: create
      },{
        path: 'profile',
        name: 'profile',
        component: profile
      },{
        path: 'edit/:id',
        name: 'edit',
        component: edit
      }]
    }]
})
