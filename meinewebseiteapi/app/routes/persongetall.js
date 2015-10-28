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
const REST_PATH = '/person';

/**
 * Der PersonGETALL Route definiert den Zugriff, alle Personen aus unserer Datenbank zurückzuliefern.
 *
 * Aufruf: GET - http(s)://api.meinewebseite.de/person
 *
 * Die Personen-Daten werden als JSON Array zurück geliefert.
 *
 * @author Sascha Sambale
 */
class PersonRouteGETALL extends Route {
  constructor() {
    // Übergabe der Parameter an die Superklasse.
    super(REST_METHOD, REST_PATH, routeHandler);
  }
}

/**
 * Der Route Handler, wird aufgerufen, sobald der Pfad mit der richtigen Zugriffsmethode aufgerufen wird.
 *
 * Im Rahmen der PersonGETALL Route werden alle Personen aus unserer Datenbank zurückgegeben.
 *
 * @param request Der ankommende Request mit allen Parameterdaten.
 * @param reply Die Callback Methode, um dem Client ein Ergebnis zurück zu liefern.
 */
var routeHandler = function routeHandler(request, reply) {
  personModelProvider.getModel().find({}, function (err, docs) {
    if (err) {
      reply(404, err);
    }
    reply(docs);
  });
};

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Module diese nutzen können.
 */
module.exports = new PersonRouteGETALL();


