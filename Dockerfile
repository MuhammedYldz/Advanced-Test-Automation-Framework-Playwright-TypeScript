# Base image with Node.js and Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variable for CI
ENV CI=true

# Command to run tests
CMD ["npm", "test"]
