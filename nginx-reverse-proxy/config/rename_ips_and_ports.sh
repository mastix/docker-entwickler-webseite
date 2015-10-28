#!/bin/bash

# Hier nutzen wir Dockers Umgebungsvariablen, um unsere Platzhalter in der default.conf zu ersetzen.
echo "START UPDATING DEFAULT CONF"

# Wir schauen in unserer default.conf zum Beispiel nach dem Platzhalter MEINEWEBSEITE_RESTAPI_IP und ersetzen diesen mit dem Wert der von Docker zur Verfügung gestellten Umgebungsvariable.
#
# Beispiel:
#
# MEINEWEBSEITEAPI_PORT_3001_TCP_ADDR: Beinhaltet die IP Adresse des REST-API Containers
# MEINEWEBSEITEAPI_PORT_3001_TCP_PORT: Beinhaltet den offenen Port des REST-API Containers (siehe `expose` parameter in der docker-compose.yml)
#
#

[ -z "${MEINEWEBSEITE_PORT_8081_TCP_ADDR}" ] && echo "\$MEINEWEBSEITE_PORT_8081_TCP_ADDR is not set" || sed -i "s/MEINEWEBSEITE_IP/${MEINEWEBSEITE_PORT_8081_TCP_ADDR}/" /etc/nginx/conf.d/default.conf
[ -z "${MEINEWEBSEITE_PORT_8081_TCP_PORT}" ] && echo "\$MEINEWEBSEITE_PORT_8081_TCP_PORT is not set" || sed -i "s/MEINEWEBSEITE_PORT/${MEINEWEBSEITE_PORT_8081_TCP_PORT}/" /etc/nginx/conf.d/default.conf
[ -z "${MEINEWEBSEITEAPI_PORT_3001_TCP_ADDR}" ] && echo "\$MEINEWEBSEITEAPI_PORT_3001_TCP_ADDR is not set" || sed -i "s/MEINEWEBSEITE_RESTAPI_IP/${MEINEWEBSEITEAPI_PORT_3001_TCP_ADDR}/" /etc/nginx/conf.d/default.conf
[ -z "${MEINEWEBSEITEAPI_PORT_3001_TCP_PORT}" ] && echo "\$MEINEWEBSEITEAPI_PORT_3001_TCP_PORT is not set" || sed -i "s/MEINEWEBSEITE_RESTAPI_PORT/${MEINEWEBSEITEAPI_PORT_3001_TCP_PORT}/" /etc/nginx/conf.d/default.conf

echo "END UPDATING DEFAULT CONF"