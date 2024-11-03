FROM node:latest
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install dependencies
RUN npm install

EXPOSE 000

# Start the application
CMD ["node", "index.js"]