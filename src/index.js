/**
 * Tab component for Vue
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
/*
  <syg-tabs
            :class-tab="c-tabmenu"
            :class-item="c-tabmenu__item"
            :class-link="c-tabmenu__link"
            :items="[
                    {name:'all', text:'ALL'},
                    {name:'type', params:{tab:'bd'}, text:'BD &amp; DVD'},
                    {name:'type', params:{tab:'music'}, text:'MUSIC'},
                    {name:'type', params:{tab:'others'}, text:'OTHERS'}
                    ]"
            :default="{nane:'type', params:{tab:'all'}}">
  </syg-tabs>

  <div v-if="$route.params.tab === 'bd'">
   〜〜
  </div>

  <div v-if="$route.params.tab === 'music'">
   〜〜
  </div>
 */

import tabsCompo from './components/tabs.vue';

export default tabsCompo;
