FROM golang:1.15

# Set the Current Working Directory inside the container
# RUN export GOROOT=/usr/local/go
# RUN export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
# RUN export GOROOT=/usr/local/go
# RUN export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
# RUN export GOPATH=/home/xente/Servidor20_21/go_projects/
# RUN export PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin

ENV GOROOT=/usr/local/go
ENV PATH=$GOPATH/bin:$GOROOT/bin:$PATH
ENV GOPATH=/home/xente/Servidor20_21/go_projects/
ENV PATH=$PATH:/home/xente/Servidor20_21/go_projects/bin 
# WORKDIR $GOPATH/src/github.com/revand/App_Go_Larave_Angular_TEST/backend/go/
# RUN pwd
# RUN echo $GOPATH
# RUN echo $GOROOT
# Copy everything from the current directory to the PWD (Present Working Directory) inside the container
# COPY . .

# Download all the dependencies
# RUN ls
# RUN go get -d -v ./...
RUN go get -u github.com/gin-gonic/gin
RUN go get -u github.com/kardianos/govendor
RUN go get -u github.com/go-redis/redis
# github.com/go-redis/redis/v8
# RUN govendor sync
RUN go get -u github.com/pilu/fresh
RUN go get -u github.com/go-sql-driver/mysql

# This container exposes port 8080 to the outside world
EXPOSE 3000

# RUN chmod +x init.sh

# Run the executable
# CMD ["fresh"]