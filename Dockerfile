FROM node:latest

COPY . /home/api_boilerplate

WORKDIR /home/api_boilerplate

ENTRYPOINT npm run dev