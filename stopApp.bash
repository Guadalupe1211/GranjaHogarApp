#!/bin/bash

# Get the PIDs of the processes we want to kill
DJANGO_PID=$(ps -ef | grep 'python manage.py runserver' | grep -v grep | awk '{print $2}')
REACT_PID=$(ps -ef | grep '/usr/bin/node' | grep -v grep | awk '{print $2}')

# Kill the processes
if [ ! -z "$DJANGO_PID" ]; then
    echo "Stopping Django server..."
    kill -9 $DJANGO_PID
fi

if [ ! -z "$REACT_PID" ]; then
    echo "Stopping React app..."
    kill -9 $REACT_PID
fi

echo "All processes stopped."

