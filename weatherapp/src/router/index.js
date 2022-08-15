import Vue from 'vue';
import VueRouter from 'vue-router';
import AddCity from '../views/AddCity.vue';
import SingleWeather from '../views/Single-Weather.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity,
  },
  {
    path: '/weather/:city',
    name: 'Single-Weather',
    component: SingleWeather,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
