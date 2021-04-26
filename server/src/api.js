const express = require("express");

const Users = require("./entities/users.js");
const Friends = require("./entities/friends.js");

function init(db) {
	const router = express.Router();
	// On utilise JSON
	router.use(express.json());
	// simple logger for this router's requests
	// all requests to this router will first hit this middleware
	router.use((req, res, next) => {
		console.log('API: method %s, path %s', req.method, req.path);
		console.log('Body', req.body);
		next();
	});
	
	const users = new Users.default(db);

	/* Authentification */

	router
		.route("/authentification")
		.post(async (req, res) => {
			try {
				const { login, password } = req.body;
				// Erreur sur la requête HTTP
				if (!login || !password) {
					res.status(400).json({
						status: 400,
						message: "Requête invalide : login et password nécessaires"
					});
					return;
				}
				if (! await users.exists(login)) {
					res.status(401).json({
						status: 401,
						message: "Unknown user"
					});
					return;
				}
				
				let user_id = await users.checkpassword(login, password);

				if (user_id) {
					// Avec middleware express-session
					req.session.regenerate(function (err) {
						if (err) {
							res.status(500).json({
								status: 500,
								message: "Internal error"
							});
						}
						else {
							// C'est bon, nouvelle session créée
							req.session.user_id = user_id;
							res.status(200).json({
								status: 200,
								message: "Login and password accepted"
							});
						}
					});
					return;
				}
				// Faux login : destruction de la session et erreur
				req.session.destroy((err) => { });
				res.status(403).json({
					status: 403,
					message: "Login and/or password incorrect"
				});
				return;
			}
			catch (e) {
				// Toute autre erreur
				res.status(500).json({
					status: 500,
					message: "erreur interne",
					details: (e || "Erreur inconnue").toString()
				});
			}
		})
		.delete((req, res) => {
			req.session.destroy((err) => {
				if (err) {
					res.status(500).json({
						status: 500,
						message: "Internal error"
					});
				} else {
					res.status(200).json({
						status: 200,
						message: "User disconnected"
					});
				}
			}) 
		});

	/* Users */

	router
		.route("/user/:user_id(\\d+)")
		.get(async (req, res) => {
			try {
				const user = await users.get(req.params.user_id);
				if (!user)
					res.sendStatus(404);
				else
					res.send(user);
			}
			catch (e) {
				res.status(500).send(e);
			}
		})
		.delete((req, res, next) => {
			try {
				if (users.delete(req.params.user_id)) {
					res.status(201).send(`delete user ${req.params.user_id}`)
				} else {
					res.sendStatus(404);
				}
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

	router.post("/user", async (req, res) => {
		try {
			const { login, password, lastname, firstname } = req.body;
			
			if (!login || !password || !lastname || !firstname) {
				res.status(400).send("Missing fields");
			} else {
				if (await users.exists(login)) {
					res.status(409).json({
						status: 409,
						message: "User already exists"
					});
				} else {
					users.create(login, password, lastname, firstname)
						.then((user_id) => res.status(201).send({
							status: 201,
							message: `User ${user_id} created`
						}))
						.catch((err) => res.status(500).send(err));
				}
			}
			return;
		}
		catch (e) {
			res.status(500).send(e);
		}
	});

	/* Friends */
	
	const friends = new Friends.default(db);

	router
		.route("/user/:user_id/friends")
		// Création d'une amitié
		.post(async (req, res) => {
			try {
				const { friend_id } = req.body;
				const user_id = req.params.user_id;

				console.log(friend_id);

				if (!user_id || !friend_id) {
					res.status(400).send("Missing fields");
				}
				else if (user_id == friend_id) {
					res.status(400).send("You can't be friend with yourself :(");
				}
				else {
					if (! await users.exists(user_id) || ! await users.exists(friend_id)) {
						res.status(410).json({
							status: 410,
							message: "Users doesn't exist"
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
		// Récupération de tous les amis
		.get((req, res) => {
			try {
				const friend_list = friends.get(req.params.user_id);
				friend_list.forEach( async (friend_id) => {
					try {
						const friend = await users.get(friend_id);
						if (!friend)
							res.sendStatus(404);
						else
							res.send(friend);
					}
					catch (e) {
						res.status(500).send(e);
					}
				});
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

	router
		.route("user/:user_id/friends/:friendship_id")
		// Récupération d'un ami
		.get(async (req, res) => {
			try {
				const friend = await users.get(req.params.friendship_id);
				if (!friend)
					res.sendStatus(404);
				else
					res.send(friend);
			}
			catch (e) {
				res.status(500).send(e);
			}
		})
		// Suppression d'un ami
		.delete((req, res, next) => {
			try {
				if (friends.delete(req.params.user_id, req.params.friendship_id)) {
					res.status(201).send(`delete friendship ${req.params.user_id}, `)
				} else {
					res.sendStatus(404);
				}
			}
			catch (e) {
				res.status(500).send(e);
			}
		});

	return router;
}
exports.default = init;

