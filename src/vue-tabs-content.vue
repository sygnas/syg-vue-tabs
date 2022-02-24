<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { useTabControl } from './useTabControl';

type TProps = {
  group: string;
  tabId: string;
  tag?: string;
};

const props = withDefaults(defineProps<TProps>(), {
  tag: 'div',
});

const tabControl = useTabControl(props.group);
</script>

<template>
  <component :is="props.tag" v-if="props.tabId === tabControl.activeId.value">
    <slot></slot>
  </component>
</template>
