# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all files
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
