'use strict';

var mongoose = require('mongoose');

/**
 * Der PersonModel Provider stellt das Mongoose Model für die Queries zur mongoDB zur Verfügung. Instanzen eines Models repräsentieren ein Dokument in der Datenbank.
 *
 * @see http://mongoosejs.com/docs/models.html
 *
 * @author Sascha Sambale
 */
class PersonModelProvider {
  constructor() {
    /**
     * Das Person Schema für die Person Collection der mongoDB.
     *
     * @type {mongoose.Schema}
     */
    this.personSchema = new mongoose.Schema({
      firstname: String,
      lastname: String
    });
  }

  /**
   * Gibt das Person Model zurück, welches instanziiert werden kann, um Operation auf der Collection durchzuführen.
   *
   * @returns {mongoose.model} Das Person Model, welches auf dem Person Schema basiert.
   */
  getModel(){
    return mongoose.model('person', this.personSchema);
  }
}

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Module diese nutzen können.
 */
module.exports = new PersonModelProvider();