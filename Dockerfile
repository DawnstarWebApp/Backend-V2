FROM node:16-alpine

RUN  mkdir -p /backend
WORKDIR /backend
COPY package.json ./
RUN ["npm", "install"]

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN ["chmod" ,"+x", "/wait"]

CMD /wait && npm start

