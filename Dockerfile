FROM golang:1.22-alpine

WORKDIR /app

COPY go.sum go.mod ./

RUN go mod download && go mod verify

COPY . ./

RUN go build -v -o /usr/local/bin/app ./...

EXPOSE 7070

CMD "app"
