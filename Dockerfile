FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Expose port for Vite preview (default: 4173)
EXPOSE 4173

# Make the docker-entrypoint.sh script executable
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh
RUN chmod 777 /tmp
# Run the preview command
CMD ["npm", "run", "preview"]
