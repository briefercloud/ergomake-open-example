const express = require('express')
const { createClient } = require('redis')

const app = express()

app.get('/', async (req, res) => {
  const client = createClient({ url: 'redis://redis:6379' })
  await client.connect()
  let prevRequest = await client.get('lastRequest')
  if (!prevRequest) {
    prevRequest = 'never'
  } else {
    prevRequest = new Date(parseInt(prevRequest)).toISOString()
  }
  await client.set('lastRequest', Date.now())
  res.send(`Last Request: ${prevRequest}`)
  await client.disconnect()
})

app.listen(3000, () => {
  console.log('listening')
})
