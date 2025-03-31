# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . ./

# Build the TypeScript code
RUN npm run build

# Expose any port if needed (for MCP, probably not needed; omitted)

# Command to run the server
CMD [ "node", "build/index.js" ]