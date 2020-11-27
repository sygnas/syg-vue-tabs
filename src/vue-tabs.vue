<template>
  <section :class="classWrapper">
    <nav :class="classTabs">
      <vue-tabs-item
        v-for="(item, index) in items"
        :id="item.id"
        :key="index"
        :now-id="nowId"
        :href="item.href"
        :is-blank="item.isBlank"
        :class-link="classLink"
        @click="click"
        v-html="item.value"
      >
      </vue-tabs-item>
    </nav>

    <slot :nowId="nowId"></slot>
  </section>
</template>

<script>
import VueTabsItem from './vue-tabs-item.vue';

export default {
  components: {
    VueTabsItem,
  },
  props: {
    // デフォルトでアクティブにするタブ
    defaultId: {
      type: String,
      default() {
        return '';
      },
    },
    // urlハッシュを使って初期表示を制御するか
    useHash: {
      type: Boolean,
      default() {
        return false;
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
        return 'c-tabmenu-wrapper';
      },
    },
    // タブグループ class
    classTabs: {
      type: String,
      default() {
        return 'c-tabmenu';
      },
    },
    // リンク class
    classLink: {
      type: String,
      default() {
        return 'c-tabmenu__link';
      },
    },
  },
  data() {
    return {
      nowId: '',
    };
  },
  mounted() {
    this.checkQuery();
  },
  methods: {
    click(targetId) {
      this.setNowId(targetId);
    },
    // アクティブなタブを指定する
    setNowId(str) {
      this.nowId = str;

      if (this.useHash) {
        location.hash = this.nowId;
      }
    },
    checkQuery() {
      // useHash = true の時だけ初期アクティブを変更する
      if (this.useHash && location.hash) {
        this.defaultId = location.hash.substr(1);
      }
      this.setNowId(this.defaultId);
    },
  },
};
</script>
