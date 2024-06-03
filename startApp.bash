#!/bin/bash

# Activate the virtual environment


# Start the Django server and redirect output to log.txt
cd ./SistemaInventario/
nohup python manage.py runserver >> log.txt 2>&1 &

cd ..
# Start the React app and redirect output to log.txt
cd ./appgranja
nohup npm start >> ../log.txt 2>&1 &

