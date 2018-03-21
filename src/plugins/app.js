'use strict'

export default {
  install: (Vue, {store}) => {
    Vue.prototype.$app = {
      toast (text, timeout = 3000) {
        store.dispatch('shared/showSnackbar', {text: text, timeout: timeout}, {root: true})
      }
    }
  }
}
