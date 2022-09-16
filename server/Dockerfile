# Base image
FROM node:14

# Make folder to put our files in
RUN mkdir -p /app
RUN mkdir -p /app/server
# Set working directory so that all subsequent command runs in this folder
WORKDIR /app/server

# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install nodemon -g

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip \
    && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install scipy numpy

# Copy our app
COPY . .

ENV PORT 8080

# Expose port to access server
EXPOSE $PORT
# Command to run our app
CMD [ "npm", "start"]

