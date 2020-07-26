'use strict'

module.exports = (controller) => {
  return {
    get: [
      { path: 'token', controller: controller.getUserByToken }
    ],
    post: [
      { path: 'login', controller: controller.login },
    ],
    delete: [
      { path: 'token', controller: controller.removeToken }
    ]
  }
}