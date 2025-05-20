FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (include devDeps for building)
RUN npm ci

# Copy all source code
COPY . .

# Build the application
RUN npm run build

FROM node:lts-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose app port
EXPOSE $PORT

# Start the application
CMD ["node", "dist/main.js"]