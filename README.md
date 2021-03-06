# syg-vue-tabs

Vueでカスタマイズ可能なタブナビゲーションを実装。

## Description
Vue.jsでシンプルなタブナビゲーションを使いたい人向け。


## Release

- 2020.03.27
  - 完全に作り直して、Vue Routerを使わない方式に変更
  - 環境構築を vue-sfc-rollup に変更

## Usage

### Install

```sh
npm install --save @sygnas/vue-tabs
```

### html / JS

```html
<section>
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
</section>
```

```javascript
import Vue from 'vue';
import VueTabs from '@sygnas/vue-tabs';

  new Vue({
    el: '#app',
    components: {
      VueTabs
    },
  });
```

### Options

`<vue-tabs>`の属性。

| 属性 | 初期値 | 説明 |
| --- | --- | --- |
| items |  | タブメニューアイテムの配列（後述） |
| default-id |  | デフォルトでアクティブ（表示）するコンテンツ識別子 |
| class-wrapper | c-tabmenu-wrapper | 全体のクラス名 |
| class-tabs | c-tabmenu | タブグループのクラス名 |
| class-link | c-tabmenu__link | タブのクラス名 |

### Items

`<vue-tabs :items="[{...}]">` の内容。

| 属性 | 説明 |
| --- | --- |
| id | タブの識別子。コンテンツの切り替えにも使う。例：`tab1` |
| href | 外部リンクの時に使う。 |
| isBlank | 別窓を開くなら `true` |
| value | タブに掲載する内容。例：`タブ1` |


## License
MIT