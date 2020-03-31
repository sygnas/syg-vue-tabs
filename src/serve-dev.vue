<script>
import Vue from 'vue';
import VueTabs from '@/vue-tabs.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueTabs
  }
});
</script>

<template>
  <div id="app">
    <vue-tabs
      v-slot:default="slotProps"
      default-id="tab2"
      :items="[
        {id: 'tab1', value:'タブ1'},
        {id: 'tab2', value:'タブ2'},
        {href:'http://google.com/', value:'Google'},
        {href:'http://google.com/', value:'Google別窓', isBlank:true},
      ]"
    >
      <div v-if="slotProps.nowId === 'tab1'">
        タブ1の内容
      </div>
      <div v-else-if="slotProps.nowId === 'tab2'">
        タブ2の内容
      </div>
    </vue-tabs>
  </div>
</template>

<style>
  .c-tabmenu{
    display: flex;
  }
  .c-tabmenu__link{
    display: block;
    padding: .5em;
  }
</style>
