export default {
  token: {
    get: () => localStorage.getItem('token'),
    set: (token) => localStorage.setItem('token', token),
    remove: () => localStorage.removeItem('token'),
  },
  user: {
    get: () => localStorage.getItem('user'),
    set: (user) => localStorage.setItem('user', user),
    remove: () => localStorage.removeItem('user'),
  },
  removeAll: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}