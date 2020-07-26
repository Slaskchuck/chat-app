#!/bin/bash
set -x
MONGO_LOG="/var/log/mongodb/mongod.log"
MONGO="/usr/bin/mongo"
MONGOD="/usr/bin/mongod"
#$MONGOD --fork --replSet fame --noprealloc --smallfiles --logpath $MONGO_LOG
$MONGOD --fork --bind_ip_all --replSet rs0 --logpath $MONGO_LOG
sleep 30

checkSlaveStatus(){
  SLAVE=$1
  $MONGO --host $SLAVE --eval db
  while [ "$?" -ne 0 ]
    do
      echo "Waiting for slave to come up..."
      sleep 15
      $MONGO admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --host $SLAVE --eval db
    done
}

if [ "$ROLE" == "database-master" ]
  then
    $MONGO --eval "rs.initiate()"
    checkSlaveStatus $ROLE
    $MONGO --eval "rs.add(\"${ROLE}:27017\")"
    checkSlaveStatus $SLAVE1
    $MONGO --eval "rs.add(\"${SLAVE1}:27017\")"
    checkSlaveStatus $SLAVE2
    $MONGO --eval "rs.add(\"${SLAVE2}:27017\")"
fi
tail -f /dev/null