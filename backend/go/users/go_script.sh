#!/bin/bash
rm -f go.mod || true
rm -f go.sum || true
go mod init goApp
go mod tidy
go get github.com/pilu/fresh
fresh