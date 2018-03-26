# **Node Cinema Microservice Application**

This repository is a project for learning new skills and understanding node and the microservice pattern

### Environment config

Each microservice will need an environment file to read environment values from, to do this create a `.env` file in the root of each microservice folder, like the following

``` env
DB_SERVERS=monogo_container:27017
MONGO_EXPOSED_PORT=27017
MOVIES_SERVICE_EXPOSED_PORT=3000
PORT=3000
MONGODB_APPLICATION_DATABASE=movies
MONGODB_APPLICATION_USER=shannon
MONGODB_APPLICATION_PASS=abc123
```

### Docker/docker-compose commands

To run docker-compose in development for each micro services use the following commands

`docker-compose -f docker-compose.dev.yaml`

### API documentation

Each service should have a swagger documentation yaml file.
