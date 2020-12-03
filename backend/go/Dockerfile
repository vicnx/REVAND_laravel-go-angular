# FROM golang:1.15

# # ENV GOROOT=/usr/local/go

# # ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
# # ENV GOPATH=/home/xente/Servidor20_21/go_projects/
# # ENV PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin 

# RUN go get -u github.com/gin-gonic/gin
# RUN go get -u github.com/kardianos/govendor
# # RUN go mod tidy
# RUN ls ../usr/local/go/src
# RUN go get -u github.com/go-redis/redis
# # github.com/go-redis/redis/v8
# # RUN govendor sync
# RUN go get -u github.com/pilu/fresh
# RUN go get -u github.com/go-sql-driver/mysql

# # This container exposes port 8080 to the outside world
# EXPOSE 3000


# =============================================================

FROM golang:1.15

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

EXPOSE 3000


# FROM golang:1.5

# ADD . /go/src/app
# WORKDIR /go/src
# RUN go get app
# RUN go install app
# ENTRYPOINT /go/bin/app

# EXPOSE 5000

# FROM ubuntu:18.04

# RUN apt-get update
# RUN apt install -y wget tar
# RUN wget https://dl.google.com/go/go1.13.3.linux-amd64.tar.gz
# RUN tar -xvf go1.13.3.linux-amd64.tar.gz
# RUN mv go /usr/local

# ENV GOROOT=/usr/local/go
# ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
# ENV GOPATH=/home/xente/Servidor20_21/go_projects/
# ENV PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin

# RUN mkdir -p $GOPATH/src/github.com/revand/

# WORKDIR $GOPATH/src/github.com/revand/

# RUN go get -u github.com/gin-gonic/gin
# RUN go get -u github.com/kardianos/govendor
# RUN go get -u github.com/pilu/fresh
# RUN go get github.com/go-sql-driver/mysql
# RUN go get -u github.com/go-redis/redis/v8

# EXPOSE 3000