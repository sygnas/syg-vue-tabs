<script setup lang="ts">
import { defineProps, withDefaults, onMounted } from 'vue';
import VueTabsItem from './vue-tabs-item.vue';
import { useTabControl } from './useTabControl';

type TTabItem = {
  id: string;
  href?: string;
  isBlank?: boolean;
  value: string;
};

type TProps = {
  group: string; // タブグループのID
  default: string; // デフォルトでアクティブにするタブ
  useHash?: boolean; // urlハッシュを使って初期表示を制御するか
  isListTag?: boolean; // <ul> タグを使ったタブにするか
  items: TTabItem[]; // タブアイテムの配列
  classTabs?: string; // タブグループ class
  classItem?: string; // <li> class。isListTag が true の時に使用
  classLink?: string; // リンク class
};

const props = withDefaults(defineProps<TProps>(), {
  default: '',
  useHash: false,
  isListTag: false,
  classTabs: 'c-tabmenu',
  classItem: 'c-tabmenu__item',
  classLink: 'c-tabmenu__link',
});

const tabControl = useTabControl(props.group, true, props.useHash);

/**
 * タブアイテムがクリックされたら、それが持つ ID を受け取る
 */
const itemClicked = (id: string) => {
  if (id === tabControl.activeId.value) return;
  tabControl.setActiveId(id, true);
};

onMounted(() => {
  // タブIDリストを登録
  const idList = props.items.filter((item) => item.id).map((item) => item.id);
  tabControl.setTabIdList(idList);

  // mouted 時に localtion.hash をチェックして、初期状態を変更する
  if (props.useHash && location.hash) {
    tabControl.setActiveId(location.hash.substr(1));
  } else {
    tabControl.setActiveId(props.default);
  }
});
</script>

<template>
  <component :is="props.isListTag ? 'ul' : 'div'" :class="props.classTabs">
    <VueTabsItem
      v-for="(item, index) in props.items"
      :id="item.id"
      :key="index"
      :active-id="tabControl.activeId.value"
      :href="item.href || ''"
      :is-blank="item.isBlank || false"
      :class-item="props.classItem"
      :class-link="props.classLink"
      :is-list-tag="props.isListTag"
      :handl-click="itemClicked"
    >
      <span v-html="item.value" />
    </VueTabsItem>
  </component>
</template>
