'use strict';

const jwt = require('jsonwebtoken'),
  path = require('path')

module.exports = async (res, req, next) => {
  const authentication = nconf.get('authentication')
    , { req: { headers, url } } = req

  if (authentication.authenticate && !authentication.publicRoutes.find(route => route === url)) {
    const error = { status: '401', title: 'Unauthorized', detail: 'Unauthorized' }

    if (!headers.authorization)
      return next(error)

    const token = headers.authorization.slice(7, headers.authorization.length)

    const [user] = await model.user.findByToken(token)

    if (!user)
      return next(error)

    const key = fs.readFileSync(path.resolve(__dirname, '..', '..', 'config/environment/public.pem'))

    try {
      await jwt.verify(token, key, { algorithms: ['RS256'] })
    } catch (err) {
      await model.user.updateUser(user._id, { token: null })

      return next(error)
    }

    req.user = user
  }

  return next()
}
