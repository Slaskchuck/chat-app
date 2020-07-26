'use strict'
const { ObjectID } = require('mongodb')

module.exports = async (database, io) => {
  database.collection('message').watch().on('change', async (result) => {
    const [ user ] = await database.collection('user').find({ _id: result.fullDocument.sender }).toArray()

    io.emit('chat.message', { ...result.fullDocument, sender: user.username })
  })
}