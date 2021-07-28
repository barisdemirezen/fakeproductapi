FROM node:14

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install typescript -g
RUN tsc

COPY views /app/dist
COPY public /app/dist
COPY *.env /app/dist

RUN cd ./dist

EXPOSE 3000

CMD [ "node", "dist/app.js" ]