import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

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
        path: '/heros/create',
        component: HeroEdit
      }, {
        path: '/heros/list',
        component: HeroList
      }, {
        path: '/heros/edit/:id',
        component: HeroEdit, props: true
      }

    ]
  },

]


const router = new VueRouter({
  routes
})

export default router
