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
    // 現在アクティブな識別子
    nowId: {
      type: String,

      default() {
        return '';
      }

    },
    // タブ切り替え対象のターゲット識別子
    id: {
      type: String,

      default() {
        return '';
      }

    },
    // url（外部リンクの場合）
    href: {
      type: String,

      default() {
        return '';
      }

    },
    // 別窓開くか
    isBlank: {
      type: Boolean,

      default() {
        return false;
      }

    },
    // リンク class
    classLink: {
      type: String,

      default() {
        return 'c-tabmenu__link';
      }

    }
  },
  computed: {
    isActive() {
      // 外部リンクはアクティブ状態にならない
      if (this.href) return false; // 現在のアクティブIDと、自分のIDが同じならアクティブ

      if (this.nowId === this.id) return true;
      return false;
    }

  },
  methods: {
    /**
     * クリックしたら発火
     * 外部リンクなら無視。
     * 自分の所有IDを返す。
     */
    clickLink(e) {
      if (this.href) return true;
      this.$emit('click', this.id);
      e.preventDefault();
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    class: _vm.classLink,
    attrs: {
      "target": _vm.isBlank ? '_blank' : '',
      "rel": _vm.isBlank ? 'noopener noreferrer' : '',
      "href": _vm.href,
      "data-active": _vm.isActive ? 'true' : ''
    },
    on: {
      "click": _vm.clickLink
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  components: {
    VueTabsItem: __vue_component__
  },
  props: {
    // デフォルトでアクティブにするタブ
    defaultId: {
      type: String,

      default() {
        return '';
      }

    },
    // urlハッシュを使って初期表示を制御するか
    useHash: {
      type: Boolean,

      default() {
        return false;
      }

    },
    // タブアイテムの配列
    items: {
      type: Array,

      default() {
        return [{
          id: 'tab',
          href: '',
          isBlank: false,
          value: 'タブ'
        }];
      }

    },
    // wrapper class
    classWrapper: {
      type: String,

      default() {
        return 'c-tabmenu-wrapper';
      }

    },
    // タブグループ class
    classTabs: {
      type: String,

      default() {
        return 'c-tabmenu';
      }

    },
    // リンク class
    classLink: {
      type: String,

      default() {
        return 'c-tabmenu__link';
      }

    }
  },

  data() {
    return {
      nowId: ''
    };
  },

  mounted() {
    this.checkQuery();
  },

  methods: {
    click(targetId) {
      this.setNowId(targetId);
    },

    // アクティブなタブを指定する
    setNowId(str) {
      this.nowId = str;

      if (this.useHash) {
        location.hash = this.nowId;
      }
    },

    checkQuery() {
      // useHash = true の時だけ初期アクティブを変更する
      if (this.useHash && location.hash) {
        this.defaultId = location.hash.substr(1);
      }

      this.setNowId(this.defaultId);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('section', {
    class: _vm.classWrapper
  }, [_c('nav', {
    class: _vm.classTabs
  }, _vm._l(_vm.items, function (item, index) {
    return _c('vue-tabs-item', {
      key: index,
      attrs: {
        "id": item.id,
        "now-id": _vm.nowId,
        "href": item.href,
        "is-blank": item.isBlank,
        "class-link": _vm.classLink
      },
      domProps: {
        "innerHTML": _vm._s(item.value)
      },
      on: {
        "click": _vm.click
      }
    });
  }), 1), _vm._v(" "), _vm._t("default", null, {
    "nowId": _vm.nowId
  })], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

// Import vue component

const install = function installVueTabs(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueTabs', __vue_component__$1);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$1;
