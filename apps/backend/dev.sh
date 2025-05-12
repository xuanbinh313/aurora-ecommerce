#!/usr/bin/env bash
# Thiết lập biến môi trường thủ công vì go trong package.json không thể chạy được  
# chạy go env để lấy thông tin

export GOCACHE="$HOME/AppData/Local/go-build"
export GOMODCACHE="$HOME/go/pkg/mod"
export GOPATH="$HOME/go"
go run cmd/server/main.go