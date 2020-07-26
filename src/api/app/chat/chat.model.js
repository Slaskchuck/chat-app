'use strict'
const { ObjectID } = require('mongodb')

class Chat {
  async createMessage(params) {
    const { ops: [result] } = await mongo.collection('message').insertOne({
      ...params,
      timestamp: moment(params.timestamp).utc().toISOString(),
    })

    return result
  }

  getAllMessage(params) {
    return mongo.collection('message')
      .aggregate([
        {
          $lookup: {
            from: 'user',
            localField: 'sender',
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $project: {
            sender: {
              $arrayElemAt: ['$sender.username', 0],
            },
            timestamp: 1,
            message: 1,
          },
        },
        {
          $match: {
            timestamp: {
              $lte: moment(params.timestamp).utc().toISOString(),
            }
          }
        },
        {
          $sort: {
            timestamp: 1,
          },
        },
      ])
      .toArray()
  }
}

module.exports = Chat