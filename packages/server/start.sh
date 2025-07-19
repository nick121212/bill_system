ps -aux | grep node
kill -15 1076795
nohup node dist/main.js > log.file 2>&1 &
