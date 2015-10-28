#
# Die offizielel mongodb Dockerfile, welche wir leicht angepasst haben, damit unser Ubuntu Base Image und unsere Konfigurationen genutzt werden. Original: https://hub.docker.com/_/mongo/
#

# Wir nutzen unser Ubuntu Base Image, welches schon die Standardpakete zur Verfügung stellt.
FROM docker_ubuntubase

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates curl \
		numactl \
	&& rm -rf /var/lib/apt/lists/*

# Wir installieren mongoDB.
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.6/gosu-$(dpkg --print-architecture)" \
	&& curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.6/gosu-$(dpkg --print-architecture).asc" \
	&& gpg --verify /usr/local/bin/gosu.asc \
	&& rm /usr/local/bin/gosu.asc \
	&& chmod +x /usr/local/bin/gosu

RUN apt-key adv --keyserver ha.pool.sks-keyservers.net --recv-keys 13ACB91D285DD02566BB4116614D985504A2163B

# Hier setzen wir die Versionsnummer für unsere gewünschte MongoDB Version.
ENV MONGO_MAJOR 3.1
ENV MONGO_VERSION 3.1.9

RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/$MONGO_MAJOR main" > /etc/apt/sources.list.d/mongodb-org.list
RUN echo "APT::Get::AllowUnauthenticated 1;" > /etc/apt/apt.conf.d/02allow-unsigned

RUN set -x \
	&& apt-get update \
	&& apt-get install -y \
		mongodb-org-unstable=$MONGO_VERSION \
		mongodb-org-unstable-server=$MONGO_VERSION \
		mongodb-org-unstable-shell=$MONGO_VERSION \
		mongodb-org-unstable-mongos=$MONGO_VERSION \
		mongodb-org-unstable-tools=$MONGO_VERSION \
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/lib/mongodb \
	&& mv /etc/mongod.conf /etc/mongod.conf.orig

RUN mkdir -p /data/db && chown -R mongodb:mongodb /data/db && chmod -R 777 /data/db
RUN mkdir -p /var/log/mongodb && chown -R mongodb:mongodb /var/log/mongodb

# Wir kopieren hier unsere eigenen Konfigurationsdateien in das Image.
COPY ./config/docker-entrypoint.sh /tmp/entrypoint.sh
COPY ./config/mongodb.conf /etc/mongod.conf
RUN ["chmod", "+x", "/tmp/entrypoint.sh"]

ENTRYPOINT ["/tmp/entrypoint.sh"]

CMD ["mongod", "-f", "/etc/mongod.conf"]