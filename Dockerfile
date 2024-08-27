FROM node:20.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN npm run build

EXPOSE 3000

CMD [ "node","dist/src/app.js" ]