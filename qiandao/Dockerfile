FROM node
COPY . /app
WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org\
    &&npm -i 
CMD [ "node","/app/index.js" ]