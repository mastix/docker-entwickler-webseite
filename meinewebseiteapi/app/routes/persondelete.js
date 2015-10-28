'use strict';

var Route = require('./route');
var personModelProvider = require('../models/personmodelprovider');

/**
 * Die Zugriffsmethode für unsere Route.
 *
 * @type {string}
 */
const REST_METHOD = 'DELETE';

/**
 * Der Zugriffspfad für unsere Route.
 *
 * @type {string}
 */
const REST_PATH = '/person/{id}';

/**
 * Die PersonDELETE Route definiert den Zugriff, um eine Person über die REST API aus unserer Datenbank zu löschen.
 *
 * Aufruf: DELETE - http(s)://api.meinewebseite.de/person/6adf5465edf65464f
 *
 * @author Sascha Sambale
 */
class PersonRouteDelete extends Route {
  constructor() {
    // Übergabe der Parameter an die Superklasse.
    super(REST_METHOD, REST_PATH, routeHandler);
  }
}

/**
 * Der Route Handler, wird aufgerufen, sobald der Pfad mit der richtigen Zugriffsmethode aufgerufen wird.
 *
 * Im Rahmen der PersonDELETE Route wird eine Person anhand ihrer ID über das PersonSchema aus der Datenbank gelöscht.
 *
 * @param request Der ankommende Request mit allen Parameterdaten.
 * @param reply Die Callback Methode, um dem Client ein Ergebnis zurück zu liefern.
 */
var routeHandler = function routeHandler(request, reply) {
  if (request.params.id) {
    // Löschen einer bestimmten ID aus der Datenbank
    personModelProvider.getModel().findById(request.params.id).remove(function () {
      reply(true);
    });
  }
};

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Klassen davon ableiten können.
 */
module.exports = new PersonRouteDelete();