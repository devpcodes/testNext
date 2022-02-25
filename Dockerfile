FROM node:14

# Create app directory
WORKDIR /usr/src/digispace

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install PM2
# RUN npm install pm2 -g

RUN apt-get update
RUN apt-get install -y libtool automake autoconf nasm 

RUN npm install
RUN npm install --arch=x64 --platform=linux --target=10.15.0 sharp
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# APP building
RUN npm run build
# PORT 3888
EXPOSE 3888

# start APP
CMD [ "npm", "start"]