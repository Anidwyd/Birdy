const express = require('express')
const router = express.Router()

const User = require("../entities/User")
const Friend = require("../entities/Friend")

function init(db) {

  const users = new User.default(db)
  const friends = new Friend.default(db)

  router.use((req, res, next) => {
		console.log('FRIENDS: method %s, path %s', req.method, req.path);
		console.log('Content', req.body);
		next();
	});

  // Get all friends from user
  router.get("/:user_id/friends", async (req, res) => {
    try {
      const friend_list = await friends.get(req.params.user_id);
      friend_list.forEach( async (friend_id) => {
        try {
          const friend = await users.get(friend_id);
          if (!friend)
            res.status(404).json({ message: "Friend not found" });
          else
            res.status(200).json(friend);
        }
        catch (e) {
          res.status(500).json(e);
        }
      });
    }
    catch (e) {
      res.status(500).json(e);
    }
  })

  // Get one friend from user
  router.get("/:user_id/friends/:friend_id", async (req, res) => {
    try {
      const friend = await users.get(req.params.friend_id);
      if (!friend)
        res.status(404).json({ message: "Friend not found" });
      else
        res.status(200).json(friend);
    }
    catch (e) {
      res.status(500).send(e);
    }
  })

  // Create a friendship
  router.post("/:user_id/friends", async (req, res) => {
    try {
      const { friend_id } = req.body;
      const user_id = req.params.user_id;

      console.log(friend_id);

      if (!user_id || !friend_id) {
        res.status(400).send("Missing fields");
        return
      }
      else if (user_id == friend_id) {
        res.status(400).send("You can't be friends with yourself :(");
        return
      }
      else {
        if (! await users.exists(user_id) || ! await users.exists(friend_id)) {
          res.status(410).json({
            status: 410,
            message: "One of the users doesn't exist"
          });
        }
        if (await friends.exists(user_id, friend_id)) {
          res.status(410).json({
            status: 410,
            message: "Friendship already exists"
          });
        } else {
          friends.add(user_id, friend_id)
            .then((user_id, friend_id) => res.status(201).send({
              status: 201,
              message: `Added user ${friend_id} to user ${user_id}'s friends list`,
            }))
            .catch((err) => res.status(502).send({ error: err }));
        }
      }
    }
    catch (e) {
      res.status(500).send(e);
    }
  })









  return router
}

module.exports = init