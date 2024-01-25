#!/bin/bash


# Initialize the replica set
#!/bin/bash

# Initialize the replica set using docker-compose exec
docker-compose exec mongo-db-1 mongo --eval 'rs.initiate({_id: "rs0", members: [{_id: 0, host: "mongo-db-1:27017"}, {_id: 1, host: "mongo-db-2:27017"}, {_id: 2, host: "mongo-db-3:27017"}]})'
