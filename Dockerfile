FROM node:4
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install pm2 -g
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
EXPOSE 80
EXPOSE 443
EXPOSE 3000
#Set the node env
ENV NODE_ENV production
CMD ["pm2-docker", "server/dist/server.js"]
#RUN chmod a+x run.sh
#CMD ["./run.sh"]