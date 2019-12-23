import GameWebSocket from 'websocket-heartbeat-js'

const pingMsg = JSON.stringify({ act: 'heart' })
const options = {
  // url: 'ws://192.168.10.200:12345',
  url: 'ws://47.104.145.109:8088',
  // url: 'ws://192.168.10.45:9000/',
  pingMsg: pingMsg,
  pingTimeout: 3000,
  pongTimeout: 3000,
  reconnectTimeout: 3000
}
const ws = new GameWebSocket(options)
export { ws }