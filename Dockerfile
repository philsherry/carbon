FROM node:argon

RUN mkdir /root/.ssh/ && ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
COPY id_rsa /root/.ssh/id_rsa
RUN chown 0400 /root/.ssh/id_rsa

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install npm -g --quiet
RUN npm install gulp -g --quiet
RUN npm install babel@5.6.1 -g --quiet
RUN npm install --quiet

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "gulp" ]
