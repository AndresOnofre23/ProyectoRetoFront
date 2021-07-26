import Vue from 'vue'
import Router from 'vue-router'


import store from './store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import(/* webpackChunkName: "about" */ './views/Usuario.vue'),
      meta: {requireAuth: true}
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {

  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)

  if(rutaProtegida && store.state.token === ''){

    next({name: 'login'});

  }else{
    next();
  }


});


export default router;
