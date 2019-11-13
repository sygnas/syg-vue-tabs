// 共通のタブコンポーネント

<template>
  <ul :class="classTab">
    <li v-for="(item, index) in items" :key="index" :class="classItem" >
      <a v-if="item.type === 'external'" :href="item.url" :class="classLink">
        {{ item.text }}
      </a>

      <router-link v-else :to="{ name: item.name, params: item.params }" :class="classLink" >
        {{ item.text }}
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
      default () {
        return 'c-tabmenu';
      },
    },
    // タブアイテム class
    classItem: {
      type: String,
      required: false,
      default () {
        return 'c-tabmenu__item';
      },
    },
    // リンク class
    classLink: {
      type: String,
      required: false,
      default () {
        return 'c-tabmenu__link';
      },
    },
    // デフォルトでアクティブにするタブ
    default: {
      type: Object,
      required: false,
      default () {
        return {
          name: '',
          params: { tab: 'item1' },
        };
      },
    },
    // タブアイテムの配列
    items: {
      type: Array,
      required: true,
      default () {
        return [
          {
            name: 'tab', // VueRouterのルート名
            params: { tab: 'item1' }, // $route.params に与えるObject
            text: 'Tab', // 表示するテキスト
          },
        ];
      },
    },
  },
  mounted () {
    if (this.default.name && !this.$route.params.tab) {
      this.$router.replace(this.default);
    }
  },
};
</script>
