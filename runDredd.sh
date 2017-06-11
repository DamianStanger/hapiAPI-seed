#!/bin/sh

node src/server.js &
sleep 2
PID=$!
echo -e "\e[93mnode process is running with id: $PID"

./node_modules/dredd/bin/dredd hapiseed-blueprint.apib http://localhost:1337
RESULT=$?
echo -e "\e[93mdredd finished with result: $RESULT"

echo -e "\e[93mkilling node process"
kill -9 $PID

exit $RESULT