FROM node:alpine
WORKDIR '/usr/src/server'
COPY ./package.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]