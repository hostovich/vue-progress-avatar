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

  data() {
    const doubleRadius = this.radius * 2;
    const normalizedRadius = this.radius - this.stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    return {
      doubleRadius,
      normalizedRadius,
      circumference
    };
  },

  computed: {
    strokeDashoffset() {
      return this.circumference - this.progress / this.totalPoits * this.circumference;
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vpa-container",
    style: "width: " + _vm.doubleRadius + "px"
  }, [_c('svg', {
    staticClass: "vpa-svg",
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "height": _vm.doubleRadius,
      "width": _vm.doubleRadius,
      "viewBox": "0 0 " + _vm.doubleRadius + " " + _vm.doubleRadius,
      "preserveAspectRatio": "xMinYMin meet"
    }
  }, [_c('circle', {
    staticClass: "animated",
    attrs: {
      "stroke": _vm.strokeColor,
      "fill": "transparent",
      "stroke-linecap": _vm.strokeLinecap,
      "stroke-dasharray": _vm.circumference + " " + _vm.circumference,
      "stroke-dashoffset": _vm.strokeDashoffset,
      "stroke-width": _vm.stroke,
      "r": _vm.normalizedRadius,
      "cx": _vm.radius,
      "cy": _vm.radius
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "vpa-image-container",
    style: "border-width: " + _vm.stroke + "px; border-color: " + _vm.innerStrokeColor + "; background-color: " + _vm.fillColor
  }, [_vm.image ? _c('img', {
    attrs: {
      "loading": "lazy",
      "src": _vm.image,
      "alt": "Avatar"
    }
  }) : _vm._e()])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-76540344_0", {
    source: ".vpa-container *{box-sizing:border-box}.vpa-container{position:relative}.vpa-container .vpa-svg{position:relative;z-index:10;display:block;vertical-align:middle}.vpa-container svg circle.animated{transition:stroke-dashoffset .35s;transform:rotate(-90deg);transform-origin:50% 50%}.vpa-image-container{position:absolute;top:0;left:0;z-index:0;overflow:hidden;width:100%;height:100%;border-radius:50%;border-style:solid}.vpa-image-container img{width:100%;height:100%;object-fit:cover}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueProgressAvatar(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueProgressAvatar', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
