#if [ "$EUID" -ne 0 ]
#  then echo "Please run as root"
#  exit
#fi
gnome-terminal --working-directory="~./Servidor20_21/go_projects/src/github.com/revand/App_Go_Larave_Angular_TEST/frontend/angular" -- ng serve --open

eval "$(./backend/go/start.sh)"