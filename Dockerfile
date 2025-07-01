# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
# This allows Docker to cache the npm install step if your dependencies don't change
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your bot might listen on (though Telegram bots use webhooks, so not strictly needed for polling)
# EXPOSE 3000 # Uncomment if you plan to use webhooks

# Command to run the scraper first, then the bot
# This uses a simple shell script to manage the sequence
CMD ["sh", "-c", "node scrape.js && node bot.js"]

# Alternatively, if you want to run them separately or manage the scraper with a cron job outside the bot container:
# CMD ["node", "bot.js"]
# For the scraper, you would then run: docker run <your-image-name> node scrape.js