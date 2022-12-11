FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm i typescript --save-dev
RUN npm i tslint --save-dev
RUN npm i -D jest @types/jest ts-node --save-dev
RUN npm i -D @swc/jest @swc/cli @swc/core
RUN npm i uuid @types/uuid
COPY . .
EXPOSE 3333
CMD [ "node", "server.js" ]
