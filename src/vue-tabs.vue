<template>
  <nav :class="classWrapper">
    <component :is="isListTag ? 'ul' : 'div'" :class="classTabs">
      <vue-tabs-item
        v-for="(item, index) in items"
        :id="item.id"
        :key="index"
        :now-id="nowId"
        :href="item.href"
        :is-blank="item.isBlank"
        :class-item="clasItem"
        :class-link="classLink"
        :is-list-tag="isListTag"
        @click="click"
      >
        <span v-html="item.value" />
      </vue-tabs-item>
    </component>

    <slot :nowId="nowId"></slot>
  </nav>
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
    // <ul> タグを使ったタブにするか
    isListTag: {
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
    // <li> class
    // isListTag が true の時に使用
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
    /**
     * タブアイテムがクリックされたら、それが持つ ID を受け取る
     */
    click(targetId) {
      this.setNowId(targetId);
    },
    /**
     * アクティブにしたいタブのIDを指定して this.nowID を変更
     */
    setNowId(str) {
      this.nowId = str;
      // アクティブタブIDを送信
      this.$emit('change', this.nowId);

      if (this.useHash) {
        location.hash = this.nowId;
      }
    },
    /**
     * mouted 時に localtion.hash をチェックして、初期状態を変更する
     */
    checkQuery() {
      if (this.useHash && location.hash) {
        this.defaultId = location.hash.substr(1);
      }
      this.setNowId(this.defaultId);
    },
  },
};
</script>
