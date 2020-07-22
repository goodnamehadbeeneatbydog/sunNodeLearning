LOGFILE=/home/node/logs/qiandao.log
PIDFILE=/home/node/pid/qiandao.pid

nohup npm start > $LOGFILE & echo $! > $PIDFILE