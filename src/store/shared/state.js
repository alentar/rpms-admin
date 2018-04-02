'use strict'

export default {
  layout: 'simple-layout',
  loading: false,
  snackbar: null,
  notifications: [
    {_id: 1, thumbnail: '/static/device-icon-48.png', title: 'Title 1', content: 'Something happened here', read: true, time: Date.now()},
    {_id: 2, thumbnail: '/static/device-icon-48.png', title: 'Title 1', content: 'Something happened here', read: false, time: Date.now()},
    {_id: 3, thumbnail: '/static/device-icon-48.png', title: 'Title 1', content: 'Something happened here', read: false, time: Date.now()},
    {_id: 4, thumbnail: '/static/device-icon-48.png', title: 'Title 1', content: 'Something happened here', read: false, time: Date.now()},
    {_id: 5, thumbnail: '/static/device-icon-48.png', title: 'Title 1', content: 'Something happened here', read: false, time: Date.now()}
  ]
}
