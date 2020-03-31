<template>
  <section :class="classWrapper">
    <nav :class="classTabs">
      <vue-tabs-item v-for="(item, index) in items"
        :key="index"
        :now-id="nowId"
        :id="item.id"
        :href="item.href"
        :is-blank="item.isBlank"
        :class-link="classLink"
        v-html="item.value"
        @click="click"
      >
      </vue-tabs-item>
    </nav>

    <slot :nowId="nowId"></slot>
  </section>
</template>

<script>
import VueTabsItem from './vue-tabs-item.vue';

export default {
  components:{
    VueTabsItem,
  },
  props: {
   // デフォルトでアクティブにするタブ
    defaultId: {
      type: String,
      default() {
        return "";
      },
    },
    // タブアイテムの配列
    items: {
      type: Array,
      default() {
        return [
          {
            id: 'tab',
            href: '',
            isBlank: false,
            value: 'タブ',
          },
        ];
      },
    },
    // wrapper class
    classWrapper: {
      type: String,
      default() {
        return "c-tabmenu-wrapper";
      }
    },
    // タブグループ class
    classTabs: {
      type: String,
      default() {
        return "c-tabmenu";
      },
    },
     // リンク class
    classLink: {
      type: String,
      default() {
        return "c-tabmenu__link";
      },
    },
  },
  data() {
    return {
      nowId: this.defaultId,
    };
  },
  methods: {
    click(targetId){
      this.nowId = targetId;
    },
  },
};
</script>
