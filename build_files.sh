#!/bin/bash
pip install -r requirements.txt
python SistemaInventario/manage.py collectstatic --noinput
python SistemaInventario/manage.py migrate
