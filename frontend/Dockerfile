# Set base image
FROM node

# Set working directory
WORKDIR /app

# Copy package.json and install packages
COPY package.json .
RUN npm install

# Copy other project files and build
COPY . ./
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

