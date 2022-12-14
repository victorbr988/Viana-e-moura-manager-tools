FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY ./src ./src

COPY . .

RUN npm run build


CMD [ "npm", "run", "preview" ]
