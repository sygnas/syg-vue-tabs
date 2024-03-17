<script setup lang="ts">
import { defineProps, withDefaults, onMounted } from 'vue';
import VueTabsItem from './vue-tabs-item.vue';
import { useTabControl } from './useTabControl';

type TTabItem = {
  id: string;
  value: string;
  href?: string;
  isBlank?: boolean;
};

type TProps = {
  group: string; // タブグループのID
  default: string; // デフォルトでアクティブにするタブ
  items: TTabItem[]; // タブアイテムの配列
  useHash?: boolean; // urlハッシュを使って初期表示を制御するか
  isListTag?: boolean; // <ul> タグを使ったタブにするか
  auto?: number; // ミリ秒を指定すると自動で次のタブを開く
  isStopAuto?: boolean; // クリックすると auto が終了する
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

  // 自動切り替えを無効化する
  if (props.isStopAuto) {
    tabControl.stopAutoChange();
  }
};

onMounted(() => {
  // タブIDリストを登録
  // [{id:'foo', value:'ふー'},
  // {id:'bar', value:'ばー'}] のリストから id のみ抽出して
  // ['foo', 'bar'] にする
  const idList = props.items.filter((item) => item.id).map((item) => item.id);
  tabControl.setTabIdList(idList);

  // mouted 時に localtion.hash をチェックして、初期状態を変更する
  if (props.useHash && location.hash) {
    tabControl.setActiveId(location.hash.substr(1));
  } else {
    tabControl.setActiveId(props.default);
  }

  // 自動切り替え
  if (props.auto && props.auto >= 1) {
    tabControl.startAutoChange(props.auto);
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
