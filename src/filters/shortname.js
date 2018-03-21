'use strict'

export default (value) => {
  let partials = value.split(' ')
  let lastname = partials[partials.length - 1]
  let initials = ''

  for (let i = 0; i < partials.length - 1; i++) {
    const letter = partials[i].charAt(0)
    initials += letter + '.'
  }

  return lastname + ' ' + initials
}
