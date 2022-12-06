FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package* ./

RUN npm install

COPY ./src ./src

COPY ./public ./public

COPY index.html ./

COPY *.config.* ./

COPY tsconfig* ./

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
