FROM node:14
RUN npm install
RUN npm run build
ADD views /dist
ADD public /dist
ADD .env /dist
WORKDIR /dist
EXPOSE 3000
CMD ["node", "app.js"]