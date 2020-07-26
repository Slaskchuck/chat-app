'use strict'

class Chat {
  async sendMessage(params, custom) {
    const { user } = custom
    const { message, timestamp } = params

    if (!message)
      throw { status: 400, detail: 'message is required' }

    const { sender, result } = await model.chat.createMessage({ timestamp, message, sender: user._id })

    return {
      ...result,
      sender: user.username
    }
  }

  async getAllMessage(params) {
    const messages = model.chat.getAllMessage(params)

    return messages
  }
}

module.exports = Chat