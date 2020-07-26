'use strict';

const router_initializer = (app, route) => {
    const controller = new (require(`../../app/${route}/${route}.controller`))()
      , api_routes = require(`../../app/${route}/${route}.route`)(controller)

    Object.keys(api_routes).map(method => {
      api_routes[method].map(url => {
        app[method](`/${route}/${url.path}`, async (req, res, next) => {
          try {
            const params = { ...req.body, ...req.params, ...req.query }
            const custom = { user: { ...req.res.user } }
            const result = await url.controller(params, custom)
            return res.status(200).send({ data: result, status: 200 })
          } catch (err) {
            next(err)
          }
        })
      })
    })
  }

module.exports = (app) => {
  const routes = fs.readdirSync('./app')

  routes.map(route => {
    if (!['node'].includes(route))
      router_initializer(app, route)
  })
}
