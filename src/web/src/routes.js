import * as Component from './pages'

const routes = [
  {
    path: '/',
    exact: true,
    component: Component.Signup,
    key: 'signup'
  },
  {
    path: '/chat',
    exact: true,
    component: Component.Chat,
    key: 'chat'
  }
]

export { routes }