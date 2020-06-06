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
const colordb = low(new FileSync('.data/colordb.json'));

// set default data
db.defaults({ surveys: [], users: [] }).write();

//API'S

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
 * @query uuid
 *
 * 1. random farbe aus datenset
 * 2. prüfen ob Spieler bereits farbe gespielt
 * (3.) wenn bereits gespielt bei 1. neu beginnen
 */
app.get('/randomcolor', function (request, response) {
  const usersuuid = request.query.uuid;
  const playedColors = db.get('users').find({ uuid: usersuuid }).value();
  var isNewColor = false;
  while (!isNewColor) {
    var randColor = colordb.get('colors').sample().value();
    if (playedColors !== undefined) {
      if (!playedColors.doneColors.includes(randColor.hex)) {
        isNewColor = true;
      }
    } else {
      isNewColor = true;
    }
  }
  response.send(randColor);
});

/**
 * creates a new entry in the surveys collection with the submitted values
 * @query survey results
 *
 * 1. result in surveys db
 * 2. for user insert color in doneColors
 */
app.post('/surveys', function (request, response) {
  console.log(request.query);
  db.get('surveys')
    .push({
      uuid: request.query.uuid,
      modern_klassisch: request.query.modern_klassisch,
      unterhaltsam_serioes: request.query.unterhaltsam_serioes,
      color: request.query.color,
    })
    .write();
  db.get('users').find({uuid: request.query.uuid}).get('doneColors').push(request.query.color).write();
  console.log('New survey inserted');
  response.sendStatus(200);
});

/**
 * get rangliste
 */
app.get('/ranking', function (request, response) {});

// get all surveys - for testing
app.get('/surveys', function (request, response) {
  response.json(db.get('surveys'));
});

//get all colors - for testing
app.get('/colors', function (request, response) {
  response.json(colordb.get('colors'));
});

// clear surveys - for testing
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
