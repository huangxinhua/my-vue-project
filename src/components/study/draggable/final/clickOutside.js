"use strict";

exports.__esModule = true;
exports.default = void 0;
var _default = {
  bind: function bind(el, binding
  /* vnode */
  ) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }

      if (binding.expression) {
        binding.value(e);
      }
    }

    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update: function update() {},
  unbind: function unbind(el
  /* binding */
  ) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
exports.default = _default;
