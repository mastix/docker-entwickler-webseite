'use strict';

var Route = require('./route');
var personModelProvider = require('../models/personmodelprovider');

/**
 * Die Zugriffsmethode für unsere Route.
 *
 * @type {string}
 */
const REST_METHOD = 'POST';

/**
 * Der Zugriffspfad für unsere Route.
 *
 * @type {string}
 */
const REST_PATH = '/person';

/**
 * Die PersonADD Route definiert den Zugriff, um eine Person über die REST API in unserer Datenbank zu speichern.
 *
 * Aufruf: POST - http(s)://api.meinewebseite.de/person
 *
 * Die Personen-Daten können entweder als form-data oder als JSON übergeben werden.
 *
 * @author Sascha Sambale
 */
class PersonRouteAdd extends Route {
  constructor() {
    // Übergabe der Parameter an die Superklasse.
    super(REST_METHOD, REST_PATH, routeHandler);
  }
}

/**
 * Der Route Handler, wird aufgerufen, sobald der Pfad mit der richtigen Zugriffsmethode aufgerufen wird.
 *
 * Im Rahmen der PersonADD Route wird eine neue Person über das PersonSchema zur Datenbank hinzugefügt.
 *
 * @param request Der ankommende Request mit allen Parameterdaten.
 * @param reply Die Callback Methode, um dem Client ein Ergebnis zurück zu liefern.
 */
var routeHandler = function routeHandler(request, reply) {
  var Person = personModelProvider.getModel();
  var newPerson = new Person();

  // Setzen der Daten aus dem Request
  newPerson.id = request.payload.id;
  newPerson.lastname = request.payload.lastname;
  newPerson.firstname = request.payload.firstname;

  // Speichern der Daten in der Datenbank
  newPerson.save(function (err) {
    if (!err) {
      reply(newPerson).created('/person/' + newPerson.id);    // HTTP 201
    } else {
      reply("ERROR SAVING NEW PERSON!!!"); // HTTP 403
    }
  });
};

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Module diese nutzen können.
 */
module.exports = new PersonRouteAdd();