// 共通のタブコンポーネント
<!--
<syg-tabs
  :class-tab="c-tabmenu"
  :class-item="c-tabmenu__item"
  :class-link="c-tabmenu__link"
  :items="[
    { name: 'all', text: 'ALL' },
    { name: 'type', params: { tab: 'bd' }, text: 'BD &amp; DVD' },
    { name: 'type', params: { tab: 'music' }, text: 'MUSIC' },
    { name: 'type', params: { tab: 'others' }, text: 'OTHERS' },
    { type: 'external', url: 'https://twitter.com/', text: 'Twitter' },
  ]"
  :default="{ nane: 'type', params: { tab: 'all' } }"
>
  </syg-tabs>

<div v-if="$route.params.tab === 'bd'">
   〜〜
  </div>

<div v-if="$route.params.tab === 'music'">
   〜〜
  </div>
-->

<template>
  <ul :class="classTab">
    <li v-for="(item, index) in items" :key="index" :class="classItem">
      <a v-if="item.type === 'external'" :href="item.url" :class="classLink" v-html="item.text">
      </a>

      <router-link v-else :to="{ name: item.name, params: item.params }" :class="classLink" v-html="item.text">
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
      default() {
        return 'c-tabmenu';
      },
    },
    // タブアイテム class
    classItem: {
      type: String,
      default() {
        return 'c-tabmenu__item';
      },
    },
    // リンク class
    classLink: {
      type: String,
      default() {
        return 'c-tabmenu__link';
      },
    },
    // デフォルトでアクティブにするタブ
    default: {
      type: Object,
      default() {
        return {
          name: 'tab',
          params: { tab: 'item1' },
        };
      },
    },
    // タブアイテムの配列
    items: {
      type: Array,
      required: true,
      default() {
        return [
          {
            name: 'tab',
            params: { tab: 'item1' }, // $route.params に与えるObject
            text: 'Tab', // 表示するテキスト
          },
        ];
      },
    },
  },
  mounted() {
    if (this.default.name && !this.$route.params.tab) {
      this.$router.replace(this.default);
    }
  },
};
</script>
