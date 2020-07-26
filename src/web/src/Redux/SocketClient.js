import socketIO from 'socket.io-client'

export default socketIO(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket', 'polling']
})