import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit
      }, {
        path: '/categories/list',
        component: CategoryList
      }, {
        path: '/categories/edit/:id',
        component: CategoryEdit, props: true
      },
      {
        path: '/items/create',
        component: ItemEdit
      }, {
        path: '/items/list',
        component: ItemList
      }, {
        path: '/items/edit/:id',
        component: ItemEdit, props: true
      },
      {
        path: '/heroes/create',
        component: HeroEdit
      }, {
        path: '/heroes/list',
        component: HeroList
      }, {
        path: '/heroes/edit/:id',
        component: HeroEdit, props: true
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      }, {
        path: '/articles/list',
        component: ArticleList
      }, {
        path: '/articles/edit/:id',
        component: ArticleEdit, props: true
      }

    ]
  },

]


const router = new VueRouter({
  routes
})

export default router
