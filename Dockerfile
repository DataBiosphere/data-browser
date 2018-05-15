FROM node:6
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install pm2 -g

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./dist /usr/src/app/dist
COPY ./server/dist /usr/src/app/server/dist
COPY ./views /usr/src/app/views

EXPOSE 3000
#Set the node env
ENV NODE_ENV local
ENV BW_DATA_URL https://carlos.ucsc-cgp-dev.org
CMD ["pm2-docker", "server/dist/server.js"]
