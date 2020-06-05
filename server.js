const express = require("express");
const bodyParser = require("body-parser");

// setup webserver
const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${server.address().port}`);
});
app.use(express.static("public"));
app.use(bodyParser.json());

// setup database
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(".data/db.json");
const db = low(adapter);

// set default data
db.defaults({ surveys: [], users: [] }).write();

// get all surveys
app.get("/surveys", function (request, response) {
  response.json(db.get("surveys"));
});

// creates a new entry in the surveys collection with the submitted values
app.post("/surveys", function (request, response) {
  console.log(request.query);
  db.get("surveys")
    .push({
      name: request.query.name,
      uuid: request.query.uuid,
      modern_klassisch: request.query.modern_klassisch,
      unterhaltsam_serioes: request.query.unterhaltsam_serioes,
      answer: request.query.answer,
      color: request.query.color,
    })
    .write();
  console.log("New survey inserted");
  response.sendStatus(200);
});

// clear surveys
app.get("/clear", function (request, response) {
  db.get("surveys").remove().write();
  response.send("Database cleared");
});
