# Use the official Node.js 14 image from the Docker Hub
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js uses during development (usually 3000)
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
