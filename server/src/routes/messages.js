const express = require('express');
const { resolve } = require('path');
const router = express.Router()

function init(collection) {

  router.use((req, res, next) => {
		console.log('MESSAGE: method %s, path %s', req.method, req.path);
		console.log('Content', req.body);
		next();
	});

  // Get all
  router.get('/', (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.find({}, (err, docs) => {
        if (err)
          reject(res.status(500).json(err.message));
        resolve(res.json(docs.sort(_GetSortOrder("date"))));
      });
    });
  });

  // Get all from a user
  router.get('/user/:user_id', (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.find({user_id: parseInt(req.params.user_id)}, (err, docs) => {
        if (err)
          reject(res.status(500).json(err.message));
        resolve(res.json(docs.sort(_GetSortOrder("date"))));
      });
    });
  });

  // Get one
  router.get('/:message_id', (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.findOne({ _id: req.params.message_id }, { _id: 0, date: 0 }, (err, message) => {
        if (err)
          reject(res.status(500).json(err.message))
        resolve(res.json(message))
      })
    })
  })

  // Like one
  router.get('/like/:message_id', async (req, res) => {
    try {
      const user_id = req.session.user_id
      const message_id = req.params.message_id
      if (await has_liked(user_id, message_id)) {
        const response = await collection.update({_id: message_id}, {$pull : {likers: user_id}});
			  res.json(response)
      }
      else {
        const response = await collection.update({_id: message_id}, {$push : {likers: user_id}});
			  res.json(response)
      }
    }
    catch (err) {
      res.status(500).json(err.message)
    }
  })

  const has_liked = (user_id, message_id) => {
		return new Promise((resolve, reject) => {
			collection.findOne({_id: message_id, likers: user_id}, (err, doc) =>{
				if (err)
          reject(err);
        resolve(doc != undefined);
			})
		})
	}

  // Create one
  router.post('/', async (req, res) => {
    const message = {
      user_id: req.body.user_id,
      author_name: req.body.author_name,
      date: new Date(),
      content: req.body.content,
      likers: []
    }
    return new Promise( (resolve, reject) => {
      collection.insert(message, (err, newMessage) => {
        if (err)
          reject(res.status(500).json(err))
        resolve(res.json(newMessage))
      })
    })
  })

  // Deleting one
  router.delete('/:message_id', async (req, res) => {
    return new Promise( (resolve, reject) => {
      collection.remove({ _id: req.params.message_id }, (err, numRemoved) => {
        if (err)
          res.status(500).json({ message: err.message })
        resolve(res.status(200).json({ message: `Deleted message ${numRemoved}` }))
      });
    })
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