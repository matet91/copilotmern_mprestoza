#create dockerfile for reactapp
FROM node:alpine
WORKDIR '/usr/src/reactapp'
#copy package json
COPY ./package.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]