FROM node:14
RUN npm install
RUN npm run build
ADD views /dist
ADD .env /dist
WORKDIR /dist
EXPOSE 80
EXPOSE 8001
CMD ["node", "app.js"]