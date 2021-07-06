LOGFILE=/home/node/logs/gupiao.log
PIDFILE=/home/node/pid/gupiao.pid

nohup node /home/node/sunNodeLearning/gupiao/index.js > $LOGFILE & echo $! > $PIDFILE