#!/bin/bash
# if [ "$EUID" -ne 0 ]
#  then echo "Please run as root"
#  exit
# fi
# gnome-terminal --working-directory="~./Servidor20_21/go_projects/src/github.com/revand/App_Go_Larave_Angular_TEST/frontend/angular" -- ng serve --open

# eval "$(./backend/go/start.sh)"

sudo service apache2 stop
echo "Stopping apache2 -`tput setaf 2;` OK`tput sgr 0`"
sudo service mysql stop
echo "Stopping mysql -`tput setaf 2;` OK`tput sgr 0`"
sudo docker-compose up