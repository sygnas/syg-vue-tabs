<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

type TProps = {
  nowId: string;      // 現在アクティブな識別子
  id: string;         // タブ切り替え対象のターゲット識別子
  href: string;       // url（外部リンクの場合）
  isBlank: boolean;   // 別窓開くか
  classItem: string;  // <li> のclass
                      // isListTag が true の時に使用
  classLink: string;  // リンク class
  isListTag: boolean; // <ul><li> タグを使ったタブにするか
  handlClick: (id: string) => void;
};

const props = defineProps<TProps>();

const isActive = computed(() => {
  // 外部リンクはアクティブ状態にならない
  if (props.href) return false;
  // 現在のアクティブIDと、自分のIDが同じならアクティブ
  if (props.nowId === props.id) return true;
  return false;
});

/**
  * クリックしたら発火
  * 外部リンクなら無視。
  * 自分の所有IDを返す。
  */
const clickLink = (e:any) => {
  if (props.href) return true;
  props.handlClick(props.id);
  e.preventDefault();
};
</script>


<template>
  <!-- リストタグを使用するパターン -->
  <li v-if="props.isListTag" :class="props.classItem">
    <a
      :target="props.isBlank ? '_blank' : ''"
      :rel="props.isBlank ? 'noopener noreferrer' : ''"
      :href="props.href"
      :class="props.classLink"
      :data-active="isActive ? 'true' : ''"
      @click="clickLink"
    >
      <slot />
    </a>
  </li>
  <!-- リストタグを使用しないパターン -->
  <a
    v-else
    :target="props.isBlank ? '_blank' : ''"
    :rel="props.isBlank ? 'noopener noreferrer' : ''"
    :href="props.href"
    :class="props.classLink"
    :data-active="isActive ? 'true' : ''"
    @click="clickLink"
  >
    <slot />
  </a>
</template>

