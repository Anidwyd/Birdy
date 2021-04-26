curl -v -X POST -H "Content-Type: application/json" -d '{"login":"julio", "password":"gaspaccio", "lastname":"galliot", "firstname":"jules"}' http://localhost:4000/api/user
curl -v -X GET -H "Content-Type: application/json" http://localhost:4000/api/user/1
curl -v -X DELETE -H "Content-Type: application/json" http://localhost:4000/api/user/1