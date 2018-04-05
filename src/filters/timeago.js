'use strict'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

export default (value) => {
  return timeAgo.format(new Date(value))
}
