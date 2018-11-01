(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['syg-vue-tabs'] = factory());
}(this, (function () { 'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  props: {
    // タブグループ class
    classTab: {
      type: String,
      required: false,
      default: function _default() {
        return 'c-tabmenu';
      }
    },
    // タブアイテム class
    classItem: {
      type: String,
      required: false,
      default: function _default() {
        return 'c-tabmenu__item';
      }
    },
    // リンク class
    classLink: {
      type: String,
      required: false,
      default: function _default() {
        return 'c-tabmenu__link';
      }
    },
    // デフォルトでアクティブにするタブ
    default: {
      type: Object,
      required: false,
      default: function _default() {
        return {
          name: '', // vue-router のルート名
          params: { tab: 'item1' }
        };
      }
    },
    // タブアイテムの配列
    items: {
      type: Array,
      required: true,
      default: function _default() {
        return [{
          name: 'tab', // vue-router のルート名
          params: { tab: 'item1' }, // $route.params に与えるObject
          text: 'Tab' // 表示するテキスト
        }];
      }
    }
  },
  mounted: function mounted() {
    // default のルート名が指定されていて、
    // かつ、URLで tab パラメータが指定されていなければ、
    // default を採用する
    if (this.default.name && !this.$route.params.tab) {
      this.$router.push(this.default);
    }
  }
};

/* script */

var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: _vm.classTab }, _vm._l(_vm.items, function (item, index) {
    return _c('li', { key: index, class: _vm.classItem }, [_c('router-link', { class: _vm.classLink, attrs: { "to": { name: item.name, params: item.params } }, domProps: { "innerHTML": _vm._s(item.text) } })], 1);
  }));
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

  // For security concerns, we use only base name in production mode.
  component.__file = "tabs.vue";

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */

/* style inject SSR */

var tabsCompo = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

/**
 * Tab component for Vue
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */
/*
  <syg-tabs
            :class-tab="c-tabmenu"
            :class-item="c-tabmenu__item"
            :class-link="c-tabmenu__link"
            :items="[
                    {name:'all', text:'ALL'},
                    {name:'type', params:{tab:'bd'}, text:'BD &amp; DVD'},
                    {name:'type', params:{tab:'music'}, text:'MUSIC'},
                    {name:'type', params:{tab:'others'}, text:'OTHERS'}
                    ]"
            :default="{nane:'type', params:{tab:'all'}}">
  </syg-tabs>

  <div v-if="$route.params.tab === 'bd'">
   〜〜
  </div>

  <div v-if="$route.params.tab === 'music'">
   〜〜
  </div>
 */

return tabsCompo;

})));
//# sourceMappingURL=syg-vue-tabs.js.map
