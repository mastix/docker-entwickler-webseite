(function () {
    'use strict';
    /**
     * Der PersonAdd Dialog ist der modale Dialog, der es ermöglicht eine neue Person zu unserer Liste hinzuzufügen.
     *
     * Kurz: Es handelt sich um die POST Request gegen api.meinewebseite.de/person mit dem Vor- und Nachnamen als JSON im body des Requests.
     */
    var PersonAddDialog = {
        is: 'person-add-dialog',
        properties: {
            /**
             * Der Vorname als String inklusive des Validierungs-Observers, der bei jedem Anschlag prüft, ob der Name valide ist.
             */
            firstName: {
                type: String,
                observer: 'nameIsValid'
            },
            /**
             * Der Nachname als String inklusive des Validierungs-Observers, der bei jedem Anschlag prüft, ob der Name valide ist.
             */
            lastName: {
                type: String,
                observer: 'nameIsValid'
            },
            /**
             * Die URL zu unserer REST-API
             */
            url: {
                type: String,
                value: 'http://api.meinewebseite.de/person'
            }
        },

        /**
         * Fügt eine neue Person hinzu, in dem es den Vor- und Nachnamen per POST-Request an unsere REST-API schickt.
         * @param _firstname Der Vorname der neuen Person.
         * @param _lastname Der Nachname der neuen Person.
         */
        addPerson: function (_firstname, _lastname) {
            this.$.addPerson.body = {
                firstname: _firstname,
                lastname: _lastname
            };

            // Wir führen den POST-Request aus.
            this.$.addPerson.generateRequest();
        },

        /**
         * Diese Methode wird aufgerufen, sobald der Dialog geschlossen wurde (egal ob per Speichern oder Abbrechen).
         */
        addPersonDialogClosed: function () {
            // Wir prüfen, ob Speichern gedrückt wurde
            if (this.$.addPersonDlg.closingReason.confirmed === true) {
                // Falls ja, fügen wir die Person hinzu
                this.addPerson(this.$.firstNameInput.value, this.$.lastNameInput.value);
                // und leeren die Felder für eine spätere Eingabe.
                this.$.firstNameInput.value = '';
                this.$.lastNameInput.value = '';
            }
        },

        /**
         * Prüft, ob die eingegeben Daten mind. 2 Buchstaben haben - simple Prüfung.
         */
        nameIsValid: function () {
            this.$.AddSave.disabled = !!(this.$.firstNameInput.value.length < 2 || this.$.lastNameInput.value.length < 2);
        },

        /**
         * Wenn eine neue Person hinzugefügt wurde, wird automatisch diese Funktion gerufen, die wiederum ein `refreshList`-Event gefeuert,
         * welches von anderen Komponent verarbeitet werden kann.
         */
        refreshView: function () {
            this.fire('refreshList');
        },

        /**
         * Öffnet den Dialog.
         */
        openAddPersonDlg: function () {
            this.$.addPersonDlg.open();
        },

        /**
         * Schließt den Dialog.
         */
        cancelAddPersonDlg: function () {
            this.$.addPersonDlg.close();
        }
    };

    /**
     * Abschließend fügen wir den PersonAdd Dialog noch unserem Polymer-Framework hinzu.
     */
    Polymer(PersonAddDialog); // jshint ignore:line
}());
