FROM madajaju/node_plantuml

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY deploy/doc/. .

COPY . .

RUN npm install

COPY deploy/doc/package.json .

RUN mkdir docs && mv plantuml.jar docs

RUN npm run buildAll


EXPOSE 8088
CMD [ "node", "doc.js" ]
