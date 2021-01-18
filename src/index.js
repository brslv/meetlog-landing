const dotenv = require('dotenv');
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

(async function () {
  dotenv.config({path: path.join(__dirname, "../.env")});

  const {Client} = require('pg')
  const client = new Client()
  await client.connect()
// console.log(res.rows[0].message) // Hello world!

  app.use(express.static("public"));
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.post("/sub", async (req, res) => {
    const data = req.body;
    res.set("content-type", "application/json");

    try {
      await client.query('INSERT INTO subs(email, get_updates) VALUES($1, $2);', [data.email, data.getUpdates]);
      const countResult = await client.query('SELECT COUNT(*) FROM subs;');
      const count = countResult.rows[0].count;
      return res.send({ok: true, count: (!count || count < 21) ? 21 : count }); // 😇
    } catch (e) {
      const duplicateEmailErrCode = 23505;
      if (duplicateEmailErrCode === Number(e.code))
        return res.send({ok: false, message: "You're already on the list. 😻"});
      return res.send({
        ok: false,
        message: "Oops, something unexpected happened and I couldn't add you to the list... Yell at me on twitter/email to sort that out, please!"
      })
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
