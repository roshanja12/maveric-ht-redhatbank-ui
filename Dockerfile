# Specify the base image

FROM node:16-alpine

# Create a working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Start the application

CMD ["npm", "start"]
