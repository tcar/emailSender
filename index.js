require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./server/routes");
const cluster = require("cluster");
const os = require("os");
const path = require("path");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  let clusterSize = cpus;

  const workers = {};

  for (let i = 0; i < clusterSize; i++) {
    const worker = cluster.fork();
    workers[worker.id] = worker;
  }

  cluster.on("exit", oldWorker => {
    delete workers[oldWorker.id];

    //spawn new worker
    const new_worker = cluster.fork();
    workers[new_worker.id] = new_worker;
  });
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.use(routes);
  app.use(errorHandler);

  app.use(errorHandler);
  const port = process.env.SERVER_PORT;

  app.route("*").get((req, res) => {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
  });
  app.listen(port, () => console.log(`listening on port ${port}`));
}

async function errorHandler(err, req, res, next) {
  console.log(err.status);
  console.log(err.message);
  res.status(err.status).send({
    code: err.code,
    error: err.message
  });
}
