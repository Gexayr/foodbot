# Telegram Food Bot

A Telegram bot that suggests random food items from the SAS.am food catalog.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
    - [1. Get Your Telegram Bot Token](#1-get-your-telegram-bot-token)
    - [2. Clone the Repository](#2-clone-the-repository)
    - [3. Install Dependencies](#3-install-dependencies)
    - [4. Scrape Food Links](#4-scrape-food-links)
    - [5. Run the Bot](#5-run-the-bot)
- [Running with Docker](#running-with-docker)
    - [1. Build the Docker Image](#1-build-the-docker-image)
    - [2. Run the Docker Container](#2-run-the-docker-container)
    - [Docker Commands](#docker-commands)
- [Bot Commands](#bot-commands)
- [Customization and Troubleshooting](#customization-and-troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## About

This project is a Node.js-based Telegram bot designed to help users discover random food items from the SAS.am food catalog. It first scrapes all available food item links from the website (including navigating through categories) and then, upon user request, picks a random link from the collected list and sends it to the user.

## Features

* **Random Food Suggestions:** Provides a random food link from the SAS.am catalog.
* **Dynamic Scraping:** Automatically collects food item links by navigating through categories on the SAS.am website.
* **Docker Support:** Easily deployable via Docker, ensuring consistent execution across different environments without manual Node.js installation.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (v18 or higher recommended) and **npm**
* **Git**
* **Docker** (if you plan to use Docker for deployment)

## Setup and Installation

Follow these steps to get your bot up and running.

### 1. Get Your Telegram Bot Token

1.  Open Telegram and search for **BotFather**.
2.  Start a chat with BotFather and send the command `/newbot`.
3.  Follow the instructions to choose a name and username for your bot.
4.  BotFather will provide you with an **HTTP API Token**. Keep this token secure as it's essential for your bot to communicate with Telegram's API.

### 2. Clone the Repository

```bash
    git clone [https://github.com/your-username/telegram-food-bot.git](https://github.com/your-username/telegram-food-bot.git) # Replace with your repo URL if you host it
cd telegram-food-bot
```

```bash
   docker build -t telegram-food-bot .
```

```bash
  docker run -d --name my-food-bot telegram-food-bot
```


