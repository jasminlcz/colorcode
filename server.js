const express = require('express');
const bodyParser = require('body-parser');

// setup webserver
const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${server.address().port}`);
});
app.use(express.static('public'));
app.use(bodyParser.json());

// setup database
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const db = low(adapter);

// set default data
db.defaults({ surveys: [], users: [] }).write();

/**
 * Add User
 * @query username
 */
app.post('/newuser', function (request, response) {
  const username = request.query.username;
  const uuid = create_UUID();
  db.get('users').push({ name: username, uuid: uuid, favColor: '', doneColors: [] }).write();
  response.sendStatus(200);
});

/**
 * Check for existing User
 * @query uuid
 */
app.get('/searchuser', function (request, response) {
  const uuid = request.query.uuid;
  const user = db.get('users').find({ uuid: uuid }).value();
  if (user) {
    response.status(200).send(user);
  } else {
    response.sendStatus(404);
  }
});

/**
 * Random Farbe generieren
 * @param uuid
 *
 * 1. random farbe aus datenset
 * 2. prüfen ob Spieler bereits farbe gespielt
 * (3.) wenn bereits gespielt bei 1. neu beginnen
 */

app.get('/randomcolor/:uuid', function (request, response) {
  const uuid = request.params.uuid;
});

// get all surveys
app.get('/surveys', function (request, response) {
  response.json(db.get('surveys'));
});

// creates a new entry in the surveys collection with the submitted values
app.post('/surveys', function (request, response) {
  console.log(request.query);
  db.get('surveys')
    .push({
      name: request.query.name,
      uuid: request.query.uuid,
      modern_klassisch: request.query.modern_klassisch,
      unterhaltsam_serioes: request.query.unterhaltsam_serioes,
      answer: request.query.answer,
      color: request.query.color,
    })
    .write();
  console.log('New survey inserted');
  response.sendStatus(200);
});

app.get('/colordata');

// clear surveys
app.get('/clear', function (request, response) {
  db.get('surveys').remove().write();
  response.send('Database cleared');
});

// FUNCTIONS

/**
 *Generate Random uuid
 *
 * @returns uuid
 */
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
