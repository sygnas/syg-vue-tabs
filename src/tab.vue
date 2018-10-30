/**
 * Tab component for Vue
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
/*
  <tab-menu
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
  </tab-menu>

  <div v-if="$route.params.tab === 'bd'">
   〜〜
  </div>

  <div v-if="$route.params.tab === 'music'">
   〜〜
  </div>
 */


<template>
  <ul :class="clasTab">
    <li v-for="(item, index) in items" :key="index"
        :class="classItem" >
      <router-link :to="{name:item.name, params:item.params}"
                   :class="classLink" v-html="item.text">
      </router-link>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    // タブグループ class
    classTab: {
      type: String,
      required: false,
      default() {
        return 'c-tabmenu';
      },
    },
    // タブアイテム class
    classItem: {
      type: String,
      required: false,
      default() {
        return 'c-tabmenu__item';
      },
    },
    // リンク class
    classLink: {
      type: String,
      required: false,
      default() {
        return 'c-tabmenu__link';
      },
    },
    // デフォルトでアクティブにするタブ
    default: {
      type: Object,
      required: false,
      default () {
        return {
          name: '', // vue-router のルート名
          params: { tab: 'item1' },
        };
      },
    },
    // タブアイテムの配列
    items: {
      type: Array,
      required: true,
      default () {
        return [{
          name: 'tab', // vue-router のルート名
          params: { tab: 'item1' }, // $route.params に与えるObject
          text: 'Tab', // 表示するテキスト
        }];
      },
    },
  },
  mounted () {
    // default のルート名が指定されていて、
    // かつ、URLで tab パラメータが指定されていなければ、
    // default を採用する
    if (this.default.name && !this.$route.params.tab) {
      this.$router.push(this.default);
    }
  },
};
</script>

