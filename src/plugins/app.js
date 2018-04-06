'use strict'

/* global SERVICE_URI */
export default {
  install: (Vue, {store}) => {
    Vue.prototype.$app = {
      toast (text, timeout = 3000) {
        store.dispatch('shared/showSnackbar', {text: text, timeout: timeout}, {root: true})
      },

      notification (payload) {
        store.dispatch('user/pushNotification', payload)
        this.toast(payload.title)
      },

      serviceUri () {
        return SERVICE_URI
      }
    }
  }
}
