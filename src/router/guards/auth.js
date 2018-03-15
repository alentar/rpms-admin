'use strict'

import {store} from '../../store/index'

export default (to, from, next) => {
  if (store.getters['user/user'] !== null && store.getters['user/user'] !== undefined) next()
  else {
    next('/signin')
  }
}
