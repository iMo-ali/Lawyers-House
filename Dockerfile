# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install react react-dom next
# Copy the application code to the working directory
COPY . .
# Expose the port that the app will run on
EXPOSE 3000

CMD ["npm", "run", "dev"]
