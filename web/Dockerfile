FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY . .

RUN npm run dev

# RUN npm run build
