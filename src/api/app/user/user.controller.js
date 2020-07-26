'use strict'

const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  path = require('path')

class User {
  async login(params) {
    const { username, password } = params
    const { saltRounds } = nconf.get('authentication')
    let currentUser = null

    const [user] = await model.user.findByUsername(params.username)

    if (!user) {
      const hash = await bcrypt.hash(password, saltRounds)
      const newUser = await model.user.createUser(username, hash)
      currentUser = { ...newUser }
    }

    if (user && (await bcrypt.compare(password, user.password)))
      currentUser = { ...user }

    if (!currentUser)
      throw { status: 401, detail: 'Wrong username/password' }

    const key = fs.readFileSync(path.resolve(__dirname, '..', '..', 'config/environment/public.pem'))
    const token = jwt.sign(
      { username: currentUser.username, __id: currentUser._id },
      key,
      { expiresIn: '24h', algorithm: 'RS256' }
    )

    await model.user.updateUser(currentUser._id, { token })

    return { token }
  }

  async getUserByToken(params, custom) {
    const { user: { password, token, ...data } } = custom

    return data
  }

  async removeToken(params, custom) {
    const { user: { _id } } = custom

    await model.user.updateUser(_id, { token: null })

    return
  }
}

module.exports = User