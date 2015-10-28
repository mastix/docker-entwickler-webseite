# Source Code zur Erstellung einer eigenen Webseite mit Docker
Dieses Repository enthält alle Dateien die benötigt werden, um eine Webseiten-Umgebung inkl. Datenbank und REST-Service mit Docker aufzusetzen.

## Folgende Container sind involviert
* __Ubuntu Base__: Bietet die Grundlagen für alle darauf aufbauenden Images/Container.
* __Nginx Reverse Proxy__: Ist der einzige aus dem Internet zugreifbare Container und routet die Requests intern an die verschiedenen Container weiter.
    * www.meinewebseite.de und webseite.de routen zum Webseiten Container (reines HTML Markup - praktisch die Webseite an sich).
    * api.meinewebseite.de routet zur REST API im Webseiten-API Container (NodeJS v4.x Server).
* __Webseite Container__: Die Webseite, die per AJAX auf die REST API zugreift, um Daten zu lesen, zu schreiben und zu löschen.
* __Webseite-API Container__: Die REST API als Schnittstelle zwischen Webseite und Datenbank.
* __MongoDB Container__: Stellt eine mongoDB noSQL Datenbank für die REST API zur Verfügung.
    * Nur die REST API hat Zugriff auf diesen Container.   

## Technologie-Stack für die komplette Umgebung
* Docker
* Docker Compose
* ECMAScript 6 (server-seitig)
* Hapi.js
* MongoDB
* Mongoose
* Nginx
* NodeJS (v4.x)
* Polymer
* Ubuntu

## Wichtige Informationen
* Dies ist eine reine __DEMO-Anwendung__, um den Aufbau einer Webseite mittels Docker-Container zu demonstrieren, das heißt es gibt keine vollständige Input-Validierung, kein Logging und kein vollständiges Error-Handling!
* Diese Webseite ist nicht auf Performanz getrimmt, was ebenfalls dem Demo-Charakter und demnach der Lesbarkeit des Codes geschuldet ist.
* Die Domains in der Nginx Reverse-Proxy Konfiguration müssen natürlich auf Ihre Domains angepasst werden, aktuell hören sie auf *.meinewebseite.de
