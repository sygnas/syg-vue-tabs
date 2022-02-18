# syg-vue-tabs

Vue でカスタマイズ可能なタブナビゲーションを実装。

## Description

Vue.js でシンプルなタブナビゲーションを使いたい人向け。

## Release

- 2022.02.17
  - Vue3 対応
  - ほぼ作り直し
  - タブ変更の受け取りは handl-change 属性を使用
  - タブ、コンテンツを別々のコンポーネントにした
  - 外部からタブ操作できるようにした
- 2021.06.23
  - `v-on:change` を指定してアクティブなタブの ID を取得できるようにした
- 2020.03.27
  - 完全に作り直して、Vue Router を使わない方式に変更
  - 環境構築を vue-sfc-rollup に変更


## Install

```sh
npm install --save @sygnas/vue-tabs
```

Vue2 で使う時は古いバージョンです。
使い方も違うので README.md を参照してください。

```sh
npm install --save @sygnas/vue-tabs@^1.2.0
```

## シンプルな使い方

```html
<section id="app-tabs1">
  <vue-tabs
            group="tabGroup1"
            default="tab1"
            :items="[
                    {id: 'tab1', value:'タブ1'},
                    {id: 'tab2', value:'タブ2'},
                    {href:'http://google.com/', value:'Google'},
                    {href:'http://google.com/', value:'Google別窓', isBlank:true},
                    ]"
            >
  </vue-tabs>

  <vue-tabs-content group="tabGroup1" tab-id="tab1">
    タブ1の内容
  </vue-tabs-content>

  <vue-tabs-content group="tabGroup1" tab-id="tab2">
    タブ2の内容
  </vue-tabs-content>
</section>
```

```javascript
import { createApp } from 'vue';
import { VueTabs, VueTabsContent } from '@sygnas/vue-tabs';

const app = createApp({
  components: {
    VueTabs,
    VueTabsContent,
  },
});
app.mount('#app-tabs1');
```

### 解説

```html
  <vue-tabs
            group="tabGroup1"
            default="tab1"
            :items="[
                    {id: 'tab1', value:'タブ1'},
                    {id: 'tab2', value:'タブ2'},
                    {href:'http://google.com/', value:'Google'},
                    {href:'http://google.com/', value:'Google別窓', isBlank:true},
                    ]"
            >
```

`group`属性でタブグループに名前を付ける。
`default`属性で初期表示するタブのIDを指定する。
`items`属性でタブボタンを指定。`href` を指定したものはタブ切替ではなく単純なリンクになる。

```html
  <vue-tabs-content group="tabGroup1" tab-id="tab1">
    タブ1の内容
  </vue-tabs-content>
```

`group`属性に `vue-tabs` と同じ文字列を記入。
`tab-id`属性に `vue-tabs` の `items`属性に対応する文字列を記入。

`<vue-tabs-content>` は `<div>` に置き換えられる。
変更するには次に説明する `tag` 属性で指定する。


## 変更を検知、&lt;transition&gt;を使う、外部からタブを変更など


```html
<section id="app-tabs2">
  <vue-tabs
            group="tabGroup2"
            default="tabA"
            :items="[
                    {id: 'tabA', value:'タブA'},
                    {id: 'tabB', value:'タブB'},
                    ]"
            :handl-change="onChange"
            >
  </vue-tabs>

  <transition name="e-v-transition_fade" mode="out-in">
    <div v-if="activeId === 'tabA'">
      タブAの内容
    </div>

    <div v-else-if="activeId === 'tabB'">
      タブBの内容
    </div>
  </transition>

  <button @click="changeTab">タブBに切替</button>
</section>
```

```javascript
import { createApp } from 'vue';
import { VueTabs, VueTabsContent, setActiveId, getActiveId } from '@sygnas/vue-tabs';

const app2 = createApp({
  components: {
    VueTabs,
    VueTabsContent,
  },
  computed: {
    activeId() {
      return getActiveId('tabGroup2');
    },
  },
  methods: {
    onChange(id) {
      console.log('tab changed', id);
    },
    changeTab() {
      console.log('change from outside');
      setActiveId('tabGroup2', 'tabB');
    },
  },
});

app2.mount('#app-tabs2');
```

### 解説

```html
  <vue-tabs
            group="tabGroup2"
            default="tabA"
            :items="[
                    {id: 'tabA', value:'タブA'},
                    {id: 'tabB', value:'タブB'},
                    ]"
            :handl-change="onChange"
            >
  </vue-tabs>
```

`handl-change`属性で変更を受け取る。

```html
  <transition name="e-v-transition_fade" mode="out-in">
    <div v-if="activeId === 'tabA'">
      タブAの内容
    </div>
```

`<transition>` を使いたいなら `<VueTabsContent>` は使わない。
インポートした `getActiveId()` と `v-if`属性を使って切り替える。

```js
  methods: {
    onChange(id) {
      console.log('tab changed', id);
    },
    changeTab() {
      console.log('change from outside');
      setActiveId('tabGroup2', 'tabB');
    },
  },
```

タブが変更されると `<vue-tabs handl-change>` で指定した `onChange()` が実行される。
`setActiveId()` を使えばスクリプトからタブを変更できる。


## Attributes

### &lt;vue-tabs&gt;

| 属性          | 初期値            | 説明                                               |
| ------------- | ----------------- | -------------------------------------------------- |
| group         |                   | タブグループID |
| default       |                   | デフォルトでアクティブ（表示）するタブID |
| items         |                   | タブメニューアイテムの配列（後述）                 |
| use-hash      | false             | タブのアクティブIDを location.hash に付ける |
| is-list-tag   | false             | true を指定すると &lt;ul&gt; タグを使用する。デフォルトは &lt;div&gt; が使われる |
| class-tabs    | 'c-tabmenu'         | タブグループのクラス名                             |
| class-item    | 'c-tabmenu__item' | is-list-tag が true の時に使用。&lt;li&gt; のクラス名    |
| class-link    | 'c-tabmenu__link' | タブのクラス名                                     |
| handl-change  | (id:string) => void | タブが変更された時に実行される |


### Items

`<vue-tabs :items="[{...}]">` の内容。

| 属性    | 説明                                                   |
| ------- | ------------------------------------------------------ |
| id      | タブID |
| href    | 外部リンクの時に使う |
| isBlank | 別窓を開くなら `true` |
| value   | タブに掲載する内容。例：`タブ1` |

### &lt;vue-tabs-content&gt;

| 属性          | 初期値            | 説明                                               |
| ------------- | ----------------- | -------------------------------------------------- |
| group |           | タブグループID |
| tabId |           | タブ切替の識別ID |
| tag   | 'div' | `<vue-tabs-content>` 展開時のHTMLタグ |




## License

MIT
