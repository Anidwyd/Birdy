const app = require("./server.js");
const port = 4000;
app.default.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});

