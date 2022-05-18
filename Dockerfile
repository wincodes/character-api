FROM node:16

# Create app directory
WORKDIR /var/www/

#Copy package.json and package-lock to enjoy caching
COPY package*.json ./

#RUN npm ci
RUN npm install

COPY . .

COPY ./scripts /usr/local/bin/

RUN chmod +x -R /usr/local/bin

EXPOSE 5050

ENTRYPOINT ["start.sh"]