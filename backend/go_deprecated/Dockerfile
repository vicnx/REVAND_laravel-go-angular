FROM golang:1.15

ENV GOROOT=/usr/local/go
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
ENV GOPATH=/home/xente/Servidor20_21/go_projects/
ENV PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin 

RUN go get -u github.com/gin-gonic/gin
RUN go get -u github.com/kardianos/govendor
RUN go get -u github.com/pilu/fresh
RUN go get -u github.com/go-sql-driver/mysql

EXPOSE 3000