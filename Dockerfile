FROM golang:1.10.2  

LABEL WuQingqing="wuqingqing070203@163.com"
LABEL version="1.0"
LABEL description="tt-center"

ENV WORKDIR $GOPATH/src/lq-center-go
  
WORKDIR $WORKDIR  
  
RUN go get github.com/beego/bee && go get github.com/astaxie/beego && go get github.com/astaxie/beego/orm  
RUN go get github.com/lib/pq && go get github.com/satori/go.uuid && go get github.com/garyburd/redigo/redis

COPY ./conf $WORKDIR/conf
COPY ./consts $WORKDIR/consts
COPY ./controllers $WORKDIR/controllers
COPY ./models $WORKDIR/models
COPY ./oauth2 $WORKDIR/oauth2
COPY ./routers $WORKDIR/routers
COPY ./tests $WORKDIR/tests
COPY ./bin $WORKDIR/bin
COPY ./main.go $WORKDIR/

# RUN go build ./main.go  
EXPOSE 8282

CMD /sbin/ip route|awk '/default/ { print $3, " dockerhost" }' >> /etc/hosts && cat /etc/hosts && bee run

  
#ENTRYPOINT ["./main"] 