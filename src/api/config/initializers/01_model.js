'use strict'

module.exports = () => {
  const routes = fs.readdirSync('./app')
  global.model = {}

  routes.map(route => {
    global.model[route] = new (require(`../../app/${route}/${route}.model`))()
  })
}