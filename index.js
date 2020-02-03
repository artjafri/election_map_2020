const express = require('express')
const app = express()
const wsServer = require('express-ws')(app)

app.ws('/ws', function(ws, req) {
  console.log('----> received websocket connection from ' + req.ip)

  ws.on('message', function(msg) {
    wsServer.getWss().clients.forEach(c => c.send(msg))
    console.log('----> change state to ' + msg)
  })
})

app.use('/', express.static('resources'))

app.listen(2020, () => console.log('=> Ready and willing to serve (on port 80)'))
