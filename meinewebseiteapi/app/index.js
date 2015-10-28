'use strict';

/**
 * Ein wirklich simples Beispiel für eine REST-API mit hapi.js.
 *
 * @author Sascha Sambale
 */

var hapi = require('hapi');
var MongooseConnector = require('./connectors/mongoose');
var server = new hapi.Server();

/**
 * Wir importieren unsere Routes für hapi.js.
 */
var PersonAddRoute = require('./routes/personadd');
var PersonGetRoute = require('./routes/personget');
var PersonGetAllRoute = require('./routes/persongetall');
var PersonDeleteRoute = require('./routes/persondelete');

/**
 * Server Port für den REST Service.
 * @type {number}
 */
const SERVER_PORT=3001;

/**
 * Verbindungsaufbau zur MongoDB.
 */
new MongooseConnector('/person').connect();

/**
 * Erstellung der Verbindungsdaten für unseren Server.
 */
server.connection({port: SERVER_PORT});

/**
 * Wir fügen unsere Route zu unserem Server hinzu.
 *
 * Eine Route beschreibt z.B. über welchen Pfad der Code aufgerufen werden soll. Siehe zum Beispiel: /routes/personget.js.
 */
server.route(PersonAddRoute.getRoute());
server.route(PersonGetRoute.getRoute());
server.route(PersonGetAllRoute.getRoute());
server.route(PersonDeleteRoute.getRoute());

/**
 * Wir starten den Server und geben den aktuellen Stand auf der Konsole aus.
 */
server.start(function () {
  console.log('Server running at:', server.info.uri);
});