FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY deploy/doc/. .

RUN apk add openjdk8

# RUN npm install

COPY . .

EXPOSE 8088
CMD [ "node", "doc.js" ]
