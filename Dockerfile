FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm ci --no-audit

# Copy application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["serve", "-s", "build"]
