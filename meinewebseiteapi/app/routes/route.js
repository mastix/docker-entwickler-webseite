'use strict';
/**
 * Die Superklasse aller unserer genutzten Routes. Diese stellt bereits eine getRoute()-Funktion bereit, so dass jede davon
 * ableitende Klasse automatisch seine Route zurückliefern kann.
 *
 * @author Sascha Sambale
 */
class Route {
  /**
   * Der Konstruktor der Klasse, der diese Klasse mit den nötigen Informationen versorgt. Diese Informationen sind nötig,
   * damit es sich um eine valide Route für hapi.js handelt.
   *
   * @param method Die Methode für den Aufruf, z.B.: GET, POST or DELETE
   * @param path Der Zugriffspfad für diese Route, z.B.: http://www.mydomain.com/mypath.
   * @param handler - Die Handlerfunktion der Route, die beschreibt was bei einem Zugriff auf den Pfad passieren soll.
   * @param config - Das Konfigurationsobject, welches für eine hapi.js Route benötigt wird.
   */
  constructor(method, path, handler, config) {
    this.route = {
      method: method,
      path: path,
      handler: handler,
      config: config
    };
  }

  /**
   * Gibt die aktuelle Route zurück. Die Route wird hier über den Konstruktor von der ableitenden Klasse gesetzt.
   */
  getRoute() {
    return this.route;
  }
}

/**
 * Wir stellen das Modul nach außen zur Verfügung, damit andere Klassen davon ableiten können.
 */
module.exports = Route;