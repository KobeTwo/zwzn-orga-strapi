# Dockerfile
FROM node:16
# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev -y
# Set environment to production
ENV NODE_ENV=production
# Copy the configuration files
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
# Install dependencies
RUN npm install
# Copy the application files
WORKDIR /opt/app
COPY ./ .
# Set timezone to Berlin
RUN ln -fs /usr/share/zoneinfo/Europe/Berlin /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata
# Build the Strapi application
RUN yarn build
# Expose the Strapi port
EXPOSE 1337
# Start the Strapi application
CMD ["npm", "start"]