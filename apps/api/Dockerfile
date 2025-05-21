# Use official Golang image with Debian base (to install libwebp)
FROM golang:1.21-bullseye as builder

# Enable CGO
ENV CGO_ENABLED=1
ENV GO111MODULE=on

# Install libwebp for encoding/decoding WebP
RUN apt-get update && apt-get install -y libwebp-dev

# Create app directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the source code
COPY . .

# Build the Go app
RUN go build -o main ./cmd/server

# Final image
FROM debian:bullseye-slim

# Install libwebp runtime
RUN apt-get update && apt-get install -y libwebp-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy binary and any required files from builder
COPY --from=builder /app/main .

# Expose app port (edit as needed)
EXPOSE 8080

# Run app
CMD ["./main"]
