'use strict'
const { ObjectID } = require('mongodb')

class User {
  findByUsername(username) {
    return mongo.collection('user').find({ username }).toArray()
  }

  async createUser(username, password) {
    const { ops: [result] } = await mongo.collection('user').insertOne({ username, password })

    return result
  }

  updateUser(id, params) {
    return mongo.collection('user').updateOne(
      {
        _id: ObjectID(id)
      },
      {
        $set: params
      },
    )
  }

  findById(id) {
    return mongo.collection('user').find(ObjectID(id))
  }

  findByToken(token) {
    return mongo.collection('user').find({ token }).toArray()
  }
}

module.exports = User