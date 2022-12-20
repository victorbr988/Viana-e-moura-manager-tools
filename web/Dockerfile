FROM node:16.14-alpine

WORKDIR /usr/app-frontend

COPY package* ./

RUN npm install

COPY . .

RUN ls -al

CMD [ "npm", "run", "dev" ]