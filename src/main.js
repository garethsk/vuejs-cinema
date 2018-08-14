import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get () { return this.$root.moment } });

import './style.scss';

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get () { return this.$root.bus } });

import routes from './util/routes';
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
  el: '#app',

  data () {
    return {
      genre: [],
      time: [],
      movies: [],
      moment,
      day: moment(),
      bus
    }
  },

  created () {
    this.$http.get('/api').then(res => {
      this.movies = res.data;
    });

    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },

  router
});