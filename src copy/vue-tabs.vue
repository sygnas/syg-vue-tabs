<script setup lang="ts">
import { defineProps, withDefaults, onMounted, ref } from 'vue';
import VueTabsItem from './vue-tabs-item.vue';

type TTabItem = {
  id: string,
  href: string,
  isBlank: boolean,
  value: string,
}

type TProps = {
  defaultId: string;    // デフォルトでアクティブにするタブ
  useHash?: boolean;     // urlハッシュを使って初期表示を制御するか
  isListTag?: boolean;   // <ul> タグを使ったタブにするか
  items: TTabItem[];    // タブアイテムの配列
  classWrapper?: string; // wrapper class
  classTabs?: string;    // タブグループ class
  classItem?: string;    // <li> class
                        // isListTag が true の時に使用
  classLink?: string;    // リンク class
  handlChange?: (id: string) => void; // タブが変更された時に実行される
};

const props = withDefaults(defineProps<TProps>(), {
  defaultId: '',
  useHash: false,
  isListTag: false,
  classWrapper: 'c-tabmenu-wrapper',
  classTabs: 'c-tabmenu',
  classItem: 'c-tabmenu__item',
  classLink: 'c-tabmenu__link',
});

const nowId = ref('');

/**
  * アクティブにしたいタブのIDを指定して this.nowID を変更
  */
const _setNowId = (str: string) => {
  nowId.value = str;

  // アクティブタブIDを送信
  if (props.handlChange) {
    props.handlChange(nowId.value)
  }
  // urlにハッシュを付ける
  if (props.useHash) {
    location.hash = nowId.value;
  }
};

/**
  * タブアイテムがクリックされたら、それが持つ ID を受け取る
  */
const itemClicked = (targetId: string) => {
  if (targetId === nowId.value) return;

  _setNowId(targetId);
};

onMounted(() => {
  // mouted 時に localtion.hash をチェックして、初期状態を変更する
  if (props.useHash && location.hash) {
    _setNowId(location.hash.substr(1));
  }else{
    _setNowId(props.defaultId);
  }
});
</script>

<template>
  <!-- <section :class="props.classWrapper"> -->
    <slot name="default">デフォルトの内容</slot>
    <slot name="tab">
      <component :is="props.isListTag ? 'ul' : 'div'" :class="props.classTabs">
        <VueTabsItem
          v-for="(item, index) in props.items"
          :id="item.id"
          :key="index"
          :now-id="nowId"
          :href="item.href"
          :is-blank="item.isBlank"
          :class-item="props.classItem"
          :class-link="props.classLink"
          :is-list-tag="props.isListTag"
          :handl-click="itemClicked"
        >
          <span v-html="item.value" />
        </VueTabsItem>
      </component>
    </slot>

    <slot name="content" :nowId="nowId"></slot>
  <!-- </section> -->
</template>
