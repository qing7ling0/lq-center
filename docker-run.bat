docker container stop taotu-center
docker container rm taotu-center
docker run --name taotu-center -p 8080:8282 --add-host dockerhost:192.168.99.1 taotu-center:0.0.1 