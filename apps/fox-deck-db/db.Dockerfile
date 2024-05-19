FROM mysql:8.0

ENV MYSQL_DATABASE=Foxdeck \
    MYSQL_ROOT_PASSWORD=fdadmin

# copy setup-script for creating initital database-tables
COPY migrations/* /docker-entrypoint-initdb.d/

EXPOSE 3306
