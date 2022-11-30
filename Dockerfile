# Base image
FROM denoland/deno:1.23.4

# Set work dir of Docker container
WORKDIR /app

# Copy current directory and copy to Docker working directory
COPY . .

# Create access user
USER deno

# Deno commands run using docker run
CMD ["deno", "task", "prod"]

# Expose container port
EXPOSE 8000