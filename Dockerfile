FROM node:14

WORKDIR /app

COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Define the command to run your app
CMD ["serve", "-s", "build","-p","3000"]
