#!/bin/bash

## FOR INIT RUN: eval "$(./start.sh)"

echo 'export GOROOT=/usr/local/go'
echo 'export PATH=$GOPATH/bin:$GOROOT/bin:$PATH'
echo 'export GOPATH=/home/xente/Servidor20_21/go_projects/'
echo 'export PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin'

## mkdir -p $GOPATH/src/github.com/vicnx/ && cd "$_"
## git clone (repo)


## go get -u github.com/gin-gonic/gin
## go get -u github.com/kardianos/govendor
## govendor init
## govendor fetch github.com/gin-gonic/gin@v1.3
## go get -u github.com/pilu/fresh
## govendor sync


### MYSQL INSTALL
# https://phoenixnap.com/kb/how-to-install-mysql-on-ubuntu-18-04

# wget -c https://dev.mysql.com/get/mysql-apt-config_0.8.11-1_all.deb
# sudo dpkg -i mysql-apt-config_0.8.11-1_all.deb
# Select bionic
# sudo apt-get update
# sudo apt-get install mysql-server
# sudo mysql_secure_installation
# 12345678
# sudo service mysql start
# sudo mysql -u root -p
# CREATE USER 'vicnx'@'localhost' IDENTIFIED BY '12345678';
# GRANT ALL PRIVILEGES ON * . * TO 'vicnx'@'localhost';
# FLUSH PRIVILEGES;

### WORKBENCH Install
# https://ubunlog.com/mysql-workbench-un-entorno-grafico-para-trabajar-con-mysql/
# sudo apt install mysql-workbench


### CREATE DB
    # mysql> create database app_go;
    # mysql> show databases;
    # mysql> use app_go;


### go get github.com/go-sql-driver/mysql


