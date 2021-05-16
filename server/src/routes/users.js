const express = require('express')
const router = express.Router()

const User = require("../entities/User")

function init(db) {

  const users = new User.default(db)

  router.use((req, res, next) => {
		console.log('USER: method %s, path %s', req.method, req.path);
		console.log('Content', req.body);
		next();
	});

  // Get all
  router.get("/", (req, res) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err)
          reject(res.status(500).json(err));
        resolve(res.status(201).json(rows));
      })
    })
  })

  // Get one
  router.get("/:user_id(\\d+)", async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const user = await users.get(user_id)
      if (!user)
        res.status(404).json({ message: "User not found" })
      else
        res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  // Create one
  router.post("/", async (req, res) => {
    try {
      const { login, password, firstname, lastname } = req.body;

      if (!login || !password || !lastname || !firstname) {
				res.status(400).json("Missing fields");
        return
      }

      const user_id = await users.create(login, password, firstname, lastname)

      if (user_id) {
        // User has been created
        req.session.regenerate(async (err) => {
          // Error while generating session
          if (err) {
            res.status(500).json({ message: "Error creating session" })
          }
          // Session created
          else {
            req.session.user_id = user_id;
            const user = await users.get(user_id);
            res.status(201).json({
              user: user,
              user_id: user_id,
              message: `Created user ${user_id}`
            });
          }
        });
        return;
      }

      req.session.destroy();
      res.status(403).json({ message: "Failed signing up"})
      
    } catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  // Delete one
  router.delete("/:user_id(\\d+)", async (req, res) => {
    try {
      const user_id = req.params.user_id
      await users.delete(user_id)
      res.status(200).json({ message: `Deleted user ${user_id}` })
    } catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  return router
}

module.exports = init