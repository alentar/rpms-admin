'use strict'

import {store} from '../../store/index'

export default (to, from, next) => {
  if (store.getters['user/user']) next()
  else {
    next('/signin')
  }
}
