'use strict'

module.exports = (controller) => {
  return {
    get: [
      { path: '', controller: controller.getAllMessage },
    ],
    post: [
      { path: '', controller: controller.sendMessage },
    ]
  }
}