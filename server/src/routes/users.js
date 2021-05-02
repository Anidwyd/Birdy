const express = require('express')
const router = express.Router()

const Users = require("../entities/User")

function init(db) {

  const users = new Users.default(db)

  router.use((req, res, next) => {
		console.log('User: method %s, path %s', req.method, req.path);
		console.log('Body', req.body);
		next();
	});

  // Login user
  router.post("/login", async (req, res) => {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        res.status(400).json({message: "Login and password needed"})
        return
      }
      
      if (! await users.exists(login)) {
        res.status(401).json({message: "Unknown user"})
        return
      }

      const user_id = await users.checkpassword(login, password);

      if (user_id) {
        // User exists
        req.session.regenerate(async (err) => {
          // Error while generating session
          if (err) {
            res.status(500).json({ message: "Error creating session" })
          }
          // Session created
          else {
            req.session.user_id = user_id;
            const user = await users.get(user_id);
            res.status(200).json({
              user: user,
              user_id: user_id,
              message: "Login and password accepted"
            });
          }
        });
        return;
      }

      // Bad combo login / password
      req.session.destroy();
      res.status(403).json({ message: "Login or password incorrect"})
    }

    catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  // Logout user
  router.delete("/logout", (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err)
          res.status(500).json({ message: "Error destroying session" })
        else
          res.status(200).json({ message: "User disconnected" })
      })
    }
    catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  // Get user id
  router.get("/login", async (req, res) => {
    try {
      if (req.session.user_id) {
        const user_id = req.session.user_id
        const user = await users.get(user_id)
        res.status(200).json({
          user_id: user_id,
          user: user
        })
      }
      else
        res.status(202).json({ message: "User not connected" })
    }
    catch {
      res.status(500).json({ message: "Error getting the user id" });
    }
  })

  // Get all
  router.get("/", async (req, res) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
          reject(res.status(500).json(err));
        } else {
          resolve(res.status(201).json(rows));
        }
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
        res.status(201).json(user)
    } catch (err) {
      res.status(500).json({ message: "Internal error" });
    }
  })

  // Create one
  router.post("/", async (req, res) => {
    try {
      const { login, password, lastname, firstname } = req.body;

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
      // res.status(201).json({
      //   user_id: user_id,
      //   message: `Created user ${user_id}`,
      // })
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