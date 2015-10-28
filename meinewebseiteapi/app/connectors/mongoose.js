'use strict';
var mongoose = require('mongoose');

/**
 * Die Verbindungsdaten zur mongoDB werden vom Docker Daemon durch die Spezifizierung von Container Links als Umgebungsvariable zur Verfügung gestellt.
 *
 * MONGODB_DATABASE_PORT_3333_TCP_ADDR: Hostname des mongoDB containers.
 * MONGODB_DATABASE_PORT_3333_TCP_PORT: Port des mongoDB containers.
 */
const host = process.env.MONGODBDATABASE_PORT_3333_TCP_ADDR;
const port = process.env.MONGODBDATABASE_PORT_3333_TCP_PORT;

/**
 * Der Mongoose Connector kümmert sich um den Verbindungsaufbau zu unserem mongoDB Docker Container.
 *
 * @author Sascha Sambale
 */
class MongooseConnector {

  /**
   * Der Client spezifiziert beim Instantiieren des Mongoose Connectors die Collection, die für die Verbindung genutzt werden soll.
   *
   * @param collection Die Collection, die für die Persistierung genutzt werden soll.
   */
  constructor(collection) {
    this.connectionURL = `mongodb://${host}:${port}${collection}`;
  }

  /**
   * Baut die Verbindung zum mongoDB Server auf.
   */
  connect() {
    console.log(`Connecting to ${this.connectionURL}...`);
    mongoose.connect(this.connectionURL, function (error) {
      if (error) {
        console.log('Connecting to the database failed!');
        console.log(error);
	 // Wir forcieren einen Neustart von PM2.
	 process.exit(1);
      }
    })
  }
}

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Module diese nutzen können.
 */
module.exports = MongooseConnector;
