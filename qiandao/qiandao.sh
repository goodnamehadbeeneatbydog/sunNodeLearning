LOGFILE=/home/node/logs/qiandao.log
PIDFILE=/home/node/pid/qiandao.pid

nohup node /home/node/sunNodeLearning/qiandao/index.js > $LOGFILE & echo $! > $PIDFILE