const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const blog = require('./views/blog')
const index = require('./views/index')

;(async function() {
  dotenv.config({ path: path.join(__dirname, '../.env') })

  const { Client } = require('pg')
  const client = new Client()
  await client.connect()
  // console.log(res.rows[0].message) // Hello world!

  app.use(express.static('public'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.set('content-type', 'text/html')
    return res.send(index())
  })

  app.get('/blog', (req, res) => {
    res.set('content-type', 'text/html')
    return res.send(
      blog({
        articles: [
          {
            title: 'Some title',
            excerpt: 'This is some lorem lipsum text...',
            slug: 'some-title',
          },
          {
            title: 'Some other title',
            excerpt:
              "And what about this one. It's a bit longer, but hey, who cares. We need to test this one, so why not just pour out some text here.",
            slug: 'some-other-title',
          },
        ],
      })
    )
  })

  app.post('/sub', async (req, res) => {
    const data = req.body
    res.set('content-type', 'application/json')

    try {
      await client.query(
        'INSERT INTO subs(email, get_updates) VALUES($1, $2);',
        [data.email, data.getUpdates]
      )
      const countResult = await client.query('SELECT COUNT(*) FROM subs;')
      const count = countResult.rows[0].count
      return res.send({ ok: true, count: !count || count < 21 ? 21 : count }) // 😇
    } catch (e) {
      const duplicateEmailErrCode = 23505
      if (duplicateEmailErrCode === Number(e.code))
        return res.send({
          ok: false,
          message: "You're already on the list. 😻",
        })
      return res.send({
        ok: false,
        message:
          "Oops, something unexpected happened and I couldn't add you to the list... Yell at me on twitter/email to sort that out, please!",
      })
    }
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()
