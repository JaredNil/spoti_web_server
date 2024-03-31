# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

# COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]