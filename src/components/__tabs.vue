
<template>
  <ul :class="classTab">
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

