const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
dotenv.config({ path: path.join(__dirname, '../.env') })
const app = express()
const port = 3000
const db = require('./db')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/sub', async (req, res) => {
  const data = req.body
  res.set('content-type', 'application/json')

  // sql queries
  const countQuery = 'SELECT COUNT(*) FROM subs;'
  const insertQuery =
    'INSERT INTO subs(email, get_updates) VALUES($1, $2);'
  const insertParams = [data.email, data.getUpdates]

  // querying the database
  db.task(async t => {
    // insert the sub + get the count of subs
    await t.none(insertQuery, insertParams)
    return t.any(countQuery)
  })
    .then(result => {
      const [{ count }] = result
      console.log({ count, result })
      const subsCount = Number(count)

      // respond
      return res.send({ ok: true, count: subsCount < 3 ? 3 : subsCount }) // 😇
    })
    .catch(e => {
      console.log('error', e)

      const duplicateEmailErrCode = 23505
      if (duplicateEmailErrCode === Number(e.code))
        return res.send({
          ok: false,
          message: 'You\'re already on the list. 😻',
        })

      // something very bad happened, but I don't know what... 😱

      return res.send({
        ok: false,
        message:
          'Oops, something unexpected happened and I couldn\'t add you to the list... Yell at me on twitter/email to sort that out, please!',
        details: { ...e },
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
