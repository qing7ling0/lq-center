
REM docker run -p 8080:8282 taotu/center ./bin/dev.sh

docker stop taotu-center
docker rm taotu-center
docker run --name taotu-center -p 8080:8282 --network=host taotu/center bee run