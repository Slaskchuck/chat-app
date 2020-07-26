import axios from 'axios'

const services = {
  USER: '/user',
  MESSAGE: '/chat'
}

export default {
  gateway: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  }),
  routes: {
    user: {
      login: () => `${services.USER}/login`,
      token: () => `${services.USER}/token`,
    },
    chat: {
      index: () => `${services.MESSAGE}`,
    },
  },
}