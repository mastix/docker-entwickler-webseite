'use strict';

var Route = require('./route');
var personModelProvider = require('../models/personmodelprovider');

/**
 * Die Zugriffsmethode für unsere Route.
 *
 * @type {string}
 */
const REST_METHOD = 'GET';

/**
 * Der Zugriffspfad für unsere Route.
 *
 * @type {string}
 */
const REST_PATH = '/person/{id}';

/**
 * Die PersonGET Route definiert den Zugriff, um eine gewisse Person anhand der ID aus unserer Datenbank zurückzuliefern.
 *
 * Aufruf: GET - http(s)://api.meinewebseite.de/6adf5465edf65464f
 *
 * Die Personen-Daten werden als JSON Objekt zurück geliefert.
 *
 * @author Sascha Sambale
 */
class PersonRouteGET extends Route {
  constructor() {
    // Übergabe der Parameter an die Superklasse.
    super(REST_METHOD, REST_PATH, routeHandler);
  }
}

/**
 * Der Route Handler, wird aufgerufen, sobald der Pfad mit der richtigen Zugriffsmethode aufgerufen wird.
 *
 * Im Rahmen der PersonGET Route werden gewisse Personen anhand deren ID aus unserer Datenbank zurück geliefert.
 *
 * @param request Der ankommende Request mit allen Parameterdaten.
 * @param reply Die Callback Methode, um dem Client ein Ergebnis zurück zu liefern.
 */
var routeHandler = function routeHandler(request, reply) {
  if (request.params.id) {
    personModelProvider.getModel().findById(request.params.id, function (err, doc) {
      if (err) {
        reply(404, err);
      }
      reply(doc);
    });
  }
};

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Module diese nutzen können.
 */
module.exports = new PersonRouteGET();


