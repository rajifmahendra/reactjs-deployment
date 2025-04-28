FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Expose port for Vite preview (default: 4173)
EXPOSE 4173

# Make the docker-entrypoint.sh script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Run the preview command
CMD ["npm", "run", "preview"]
