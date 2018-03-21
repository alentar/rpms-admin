'use strict'

export default (value) => {
  const date = new Date(value)
  return date.toDateString()
}
