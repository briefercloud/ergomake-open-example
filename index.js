const express = require('express')
const { createClient } = require('redis')

const app = express()

app.get('/', async (req, res) => {
  const client = createClient({ url: 'redis://cache:6379' })
  await client.connect()
  let prevRequest = await client.get('lastRequest')
  if (!prevRequest) {
    prevRequest = 'never'
  } else {
    prevRequest = new Date(parseInt(prevRequest)).toISOString()
  }
  await client.set('lastRequest', Date.now())
  res.json(`[json] Last Request: ${prevRequest}`)
  await client.disconnect()
})

app.listen(3000, () => {
  console.log('listening')
})
