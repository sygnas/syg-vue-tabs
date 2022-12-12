# syg-vue-tabs

Vue でカスタマイズ可能なタブナビゲーションを実装。

## Description

Vue.js でシンプルなタブナビゲーションを使いたい人向け。

## Release

- 2022.12.12
  - VueTabs の item属性 `isBlank`、`href` を無指定でもOKにした
- 2022.02.25
  - `<VueTabs>` の `handlChange`属性を廃止
  - `getActiveId()`、`setActiveId()` を廃止
  - `useTabControl()` を新設。変更通知、`getActiveId()` などは `useTabControl()` 経由で取得する
  - 前後のタブに移動する `prevTab()`、`nextTab()` を新設
  - 変更イベント受け取りに `addChangeListener()`、タブクリック受け取りに `addClickListener()` を新設
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

  <vue-tabs-content group="tabGroup1" tab-id="tab1"> タブ1の内容 </vue-tabs-content>

  <vue-tabs-content group="tabGroup1" tab-id="tab2"> タブ2の内容 </vue-tabs-content>
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
></vue-tabs>
```

`group`属性でタブグループに名前を付ける。
`default`属性で初期表示するタブの ID を指定する。
`items`属性でタブボタンを指定。`href` を指定したものはタブ切替ではなく単純なリンクになる。

```html
<vue-tabs-content group="tabGroup1" tab-id="tab1"> タブ1の内容 </vue-tabs-content>
```

`group`属性に `vue-tabs` と同じ文字列を記入。
`tab-id`属性に `vue-tabs` の `items`属性に対応する文字列を記入。

`<vue-tabs-content>` は `<div>` に置き換えられる。
別のタグに変更するには `tag` 属性で指定する。

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
  >
  </vue-tabs>

  <transition name="e-v-transition_fade" mode="out-in">
    <div v-if="activeId === 'tabA'">タブAの内容</div>

    <div v-else-if="activeId === 'tabB'">タブBの内容</div>
  </transition>

  <button @click="prevTab">前のタブ</button>
  <button @click="nextTab">次のタブ</button>
  <button @click="changeTab">タブBに切替</button>
</section>
```

```javascript
import { createApp } from 'vue';
import { VueTabs, useTabControl } from '@sygnas/vue-tabs';

// グループIDを指定してタブの外部コントローラーを生成
const tabControl = useTabControl('tabGroup2');

const app2 = createApp({
  components: {
    VueTabs,
    VueTabsContent,
  },
  computed: {
    activeId() {
      // テンプレート側でアクティブIDを受け取れるように computed に登録
      return tabControl.activeId.value;
    },
  },
  methods: {
    changeTab() {
      // タブIDを指定して変更
      tabControl.setActiveId('tabB');
    },
    prevTab() {
      // 前のタブ
      tabControl.prevTab();
    },
    nextTab() {
      // 次のタブ
      tabControl.nextTab();
    },
  },
  mounted() {
    // タブの変更通知を受け取る関数を渡す
    tabControl.addChangeListener((ev) => {
      console.log('tab changed', ev.detail);
    });
  },
});

app2.mount('#app-tabs2');
```

### 解説

```html
  <transition name="e-v-transition_fade" mode="out-in">
    <div v-if="activeId === 'tabA'">タブAの内容</div>

    <div v-else-if="activeId === 'tabB'">タブBの内容</div>
  </transition>
```

`<transition>` を使いたいなら `<VueTabsContent>` は使わない。
インポートした `useTabControl()` の `activeId` と `v-if`属性を使って切り替える。

```js
const tabControl = useTabControl('tabGroup2');
```

タブを外部から操作するためのコントローラーを作成。

```js
// タブの変更通知を受け取る関数を渡す
tabControl.addChangeListener((ev) => {
  console.log('tab changed', ev.detail);
});
```

タブの変更イベントを受け取るためにリスナー関数を登録する。
内部は `EventTarget` と `CustomEvent` で実装している。
TypeScript で型エラーが出るなら下記のように `(〜) as EventListener` で囲む。

```js
tabControl.addChangeListener(((ev: CustomEvent) => {
  console.log('tab changed', ev.detail);
}) as EventListener);
```

## Attributes

### &lt;vue-tabs&gt;

| 属性         | 初期値              | 説明                                                                             |
| ------------ | ------------------- | -------------------------------------------------------------------------------- |
| group        |                     | タブグループ ID                                                                  |
| default      |                     | デフォルトでアクティブ（表示）するタブ ID                                        |
| items        |                     | タブメニューアイテムの配列（後述）                                               |
| use-hash     | false               | タブのアクティブ ID を location.hash に付ける                                    |
| is-list-tag  | false               | true を指定すると &lt;ul&gt; タグを使用する。デフォルトは &lt;div&gt; が使われる |
| class-tabs   | 'c-tabmenu'         | タブグループのクラス名                                                           |
| class-item   | 'c-tabmenu\_\_item' | is-list-tag が true の時に使用。&lt;li&gt; のクラス名                            |
| class-link   | 'c-tabmenu\_\_link' | タブのクラス名                                                                   |

### Items

`<vue-tabs :items="[{...}]">` の内容。

| 属性    | 初期値 | 説明                            |
| ------- | --- | ------------------------------- |
| id      |  | タブ ID                         |
| href    |  | 外部リンクの時に使う            |
| isBlank | false | 別窓を開くなら `true`           |
| value   |  | タブに掲載する内容。例：`タブ1` |

### &lt;vue-tabs-content&gt;

| 属性  | 初期値 | 説明                                    |
| ----- | ------ | --------------------------------------- |
| group |        | タブグループ ID                         |
| tabId |        | タブ切替の識別 ID                       |
| tag   | 'div'  | `<vue-tabs-content>` 展開時の HTML タグ |


## useTabControl()

タブのコントローラーを生成する。
タブを外部から操作したり、変更を受け取れる。

```js
import { VueTabs, useTabControl } from '@sygnas/vue-tabs';

// コントローラー生成
const tabControl = useTabControl('タブグループID');
// 変更受け取り
tabControl.addChangeListener((ev) => {
  console.log('変更', ev.detail);
});
// 任意のタブをアクティブ
tabControl.setActiveId('タブID');
// 前後のタブをアクティブ
tabControl.changePrevTab();
tabControl.changeNextTab();
```


## License

MIT
