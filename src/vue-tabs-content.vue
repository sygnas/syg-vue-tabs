<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue';
import { getActiveId } from './activeId';

type TProps = {
  group: string;
  tabId: string;
  tag?: string;
};

const props = withDefaults(defineProps<TProps>(), {
  tag: 'div',
});

const activeId = computed(() => getActiveId(props.group));
</script>

<template>
  <component :is="props.tag" v-if="props.tabId === activeId">
    <slot></slot>
  </component>
</template>
