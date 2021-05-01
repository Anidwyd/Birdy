const express = require('express')
const router = express.Router()

function init(collection) {

  // Get all
  router.get('/', (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.find({}, (err, docs) => {
        if (err)
          reject(res.status(500).json(err.message));
        else
          resolve(res.json(docs.sort(_GetSortOrder("date"))));
      });
    });
  });

  // Get all from a user
  router.get('/user/:user_id/', (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.find({user_id: req.params.user_id}, (err, docs) => {
        if (err)
          reject(res.status(500).json(err.message));
        else
          resolve(res.json(docs.sort(_GetSortOrder("date"))));
      });
    });
  });

  // Get one

  // Create one
  router.post('/', async (req, res) => {
    const message = {
      user_id: req.body.user_id,
      author_name: req.body.author_name,
      date: new Date(),
      content: req.body.content,
      likers: []
    }
    try {
      const newMessage = await collection.insert(message)
      res.json(newMessage)
    }
    catch (err) {
      res.status(500).json(err)
    }
  })

  // Deleting one
  router.post('/:id', async (req, res) => {
    try {
      await collection.insert(message)
      res.json({ message: 'Deleted message' })
    }
    catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  return router
}

const _GetSortOrder = (prop) => {
  return function(a, b) {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  }
}

module.exports = init