#!/bin/bash

# 「このスクリプトがある場所」まで移動
SCRIPT_DIR=$(cd $(dirname $(readlink -f $0 || echo $0));pwd -P)
cd ${SCRIPT_DIR}

# 既にあるなら停止・削除
docker ps | grep 'postgres-peels' && docker-compose down

# 実行
docker-compose up -d --build

# composeが使えない場合
# docker build -t postgres:original01 .
# docker run -d -p 5432:5432 --name postgres-base postgres:original01
