FROM node:lts-alpine
COPY . /app/
WORKDIR /app
# RUN npm config set registry https://registry.npm.taobao.org\
#     &&npm i 
VOLUME [ "/app" ]
# CMD [ "node","/app/index.js" ]
ENTRYPOINT ["node","/app/index.js"]