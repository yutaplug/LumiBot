# Discord Bot

## Overview
A simple Discord bot built with Node.js and discord.js that manages custom presence settings and clears the default BotGhost status.

## Project Structure
- `index.js` - Main bot entry point
- `package.json` - Project dependencies and scripts

## Setup
1. Set the `DISCORD_BOT_TOKEN` secret with your bot token from the Discord Developer Portal
2. Run the bot using `npm start`

## Features
- Connects to Discord using discord.js
- Clears default BotGhost status on startup
- Sets bot status to 'online' with no activity text
- Error handling for connection issues
- Express web server for keep-alive functionality (port 3000)

### Slash Commands
- `/minky` - Get a random Minky cat image (displayed in pink embed)
- `/addresponder` - Add a new autoresponder with trigger phrase, response message, and optional channel restriction

### Autoresponder
- In-memory storage for trigger-response pairs
- Supports optional channel-specific restrictions
- Case-insensitive trigger matching

## Recent Changes
- November 29, 2025: Added autoresponder feature with /addresponder command
- November 29, 2025: Added /minky command with embed format
- November 29, 2025: Initial project setup with discord.js

## User Preferences
- Node.js runtime
- discord.js library for Discord API interaction
