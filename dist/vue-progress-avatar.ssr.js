'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
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
//
//
//
//
//
//
//
//
var script = {
  name: "vue-progress-avatar",
  props: {
    image: {
      type: String,
      required: false
    },
    totalPoits: {
      type: Number,
      default: 100,
      required: false
    },
    strokeColor: {
      type: String,
      default: '#BBEE29',
      required: false
    },
    fillColor: {
      type: String,
      default: '#f5f5f5',
      required: false
    },
    innerStrokeColor: {
      type: String,
      default: '#dedede',
      required: false
    },
    strokeLinecap: {
      type: String,
      default: 'round',
      required: false
    },
    progress: {
      type: Number,
      default: 0,
      required: false
    },
    radius: {
      type: Number,
      default: 40,
      required: false
    },
    stroke: {
      type: Number,
      default: 4,
      required: false
    }
  },
  data: function data() {
    var doubleRadius = this.radius * 2;
    var normalizedRadius = this.radius - this.stroke / 2;
    var circumference = normalizedRadius * 2 * Math.PI;
    return {
      doubleRadius: doubleRadius,
      normalizedRadius: normalizedRadius,
      circumference: circumference
    };
  },
  computed: {
    strokeDashoffset: function strokeDashoffset() {
      return this.circumference - this.progress / this.totalPoits * this.circumference;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vpa-container",
    style: "width: " + _vm.doubleRadius + "px"
  }, [_vm._ssrNode("<svg xmlns=\"http://www.w3.org/2000/svg\"" + _vm._ssrAttr("height", _vm.doubleRadius) + _vm._ssrAttr("width", _vm.doubleRadius) + _vm._ssrAttr("viewBox", "0 0 " + _vm.doubleRadius + " " + _vm.doubleRadius) + " preserveAspectRatio=\"xMinYMin meet\" class=\"vpa-svg\"><circle" + _vm._ssrAttr("stroke", _vm.strokeColor) + " fill=\"transparent\"" + _vm._ssrAttr("stroke-linecap", _vm.strokeLinecap) + _vm._ssrAttr("stroke-dasharray", _vm.circumference + " " + _vm.circumference) + _vm._ssrAttr("stroke-dashoffset", _vm.strokeDashoffset) + _vm._ssrAttr("stroke-width", _vm.stroke) + _vm._ssrAttr("r", _vm.normalizedRadius) + _vm._ssrAttr("cx", _vm.radius) + _vm._ssrAttr("cy", _vm.radius) + " class=\"animated\"></circle></svg> <div class=\"vpa-image-container\"" + _vm._ssrStyle(null, "border-width: " + _vm.stroke + "px; border-color: " + _vm.innerStrokeColor + "; background-color: " + _vm.fillColor, null) + ">" + (_vm.image ? "<img loading=\"lazy\"" + _vm._ssrAttr("src", _vm.image) + " alt=\"Avatar\">" : "<!---->") + "</div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-76540344_0", {
    source: ".vpa-container *{box-sizing:border-box}.vpa-container{position:relative}.vpa-container .vpa-svg{position:relative;z-index:10;display:block;vertical-align:middle}.vpa-container svg circle.animated{transition:stroke-dashoffset .35s;transform:rotate(-90deg);transform-origin:50% 50%}.vpa-image-container{position:absolute;top:0;left:0;z-index:0;overflow:hidden;width:100%;height:100%;border-radius:50%;border-style:solid}.vpa-image-container img{width:100%;height:100%;object-fit:cover}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-76540344";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueProgressAvatar(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueProgressAvatar', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;