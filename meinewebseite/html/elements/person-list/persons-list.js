(function () {
    'use strict';
    /**
     * Die PersonList repräsentiert die Liste, die alle Personen der REST-API abfragt und anzeigt.
     *
     * Kurz: Es handelt sich um den GET Request gegen api.meinewebseite.de/person und um das Rendern der JSON-Response als HTML Quellcode.
     *
     */
    var PersonList = {
        /**
         * Beim DOM-Ready-Event fügen wir einen Event-Listener zu unserer Web-Komponente hinzu, damit wir Events von anderen Komponenten bekommen können.
         *
         * In diesem Fall hören wir auf das Event `refreshList`, welches dem Person-Add-Dialog abgefeuert wird, um die angezeigte Liste neu zu laden, bzw. einen neuen GET-Request abzuschicken.
         */
        ready: function () {
            this.addEventListener('refreshList', function () {
                this.refresh();
            });
        },
        is: 'person-list',
        properties: {
            url: {
                type: String,
                value: 'http://api.meinewebseite.de/person'
            }
        },
        /**
         * Diese Funktion nimmt die ID aus dem aufrufenden Element und löscht den dafür passenden Eintrag aus der Datenbank, in dem es einen DELETE Request gegen unsere REST-API schickt.
         *
         * @param element Das Element (z.B. ein Button), welches die Löschung verursacht hat.
         */
        deletePerson: function (element) {
            var id = Polymer.dom(element).localTarget.id; // jshint ignore:line
            this.$.deletePerson.url = 'http://api.meinewebseite.de/person/' + id;
            this.$.deletePerson.generateRequest();
        },

        /**
         * Lädt die angezeigte Liste neu, in dem es einen erneuten GET Request gegen unseren REST-API abschickt und das Ergebnis als HTML-Quellcode rendert.
         */
        refresh: function () {
            //noinspection JSUnresolvedVariable
            this.$.getPersons.generateRequest();
        }
    };

    /**
     * Abschließend fügen wir die PersonList noch unserem Polymer-Framework hinzu.
     */
    Polymer(PersonList); // jshint ignore:line
})();

