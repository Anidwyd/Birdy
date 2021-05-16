curl -v -X POST -H "Content-Type: application/json" -d '{"login":"jules", "password":"password", "firstname":"jules", "lastname":"dubreuil}' http://localhost:4000/api/user
curl -v -X GET -H "Content-Type: application/json" http://localhost:4000/api/user/1
curl -v -X DELETE -H "Content-Type: application/json" http://localhost:4000/api/user/1