nohup node dist/main.js > log.file 2>&1 &
ps -aux | grep node

kill -15 1076795