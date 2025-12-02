# Discord Bot

## Overview

This is a Discord bot built with Node.js and discord.js v14. The bot provides slash commands for image sharing, installation instructions, plugin browsing, and a server-specific autoresponder system. It uses Turso (LibSQL) for persistent storage of autoresponders, scheduled Minky intervals, and bot status.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Structure

```
├── src/
│   ├── index.js              # Main entry point - initializes client, loads handlers
│   ├── commands/             # Slash command files (one per command)
│   │   ├── minky.js          # Random Minky image command
│   │   ├── minkyinterval.js  # Schedule automatic Minky images
│   │   ├── stopminky.js      # Stop scheduled Minky images
│   │   ├── addresponder.js   # Add autoresponder (Admin)
│   │   ├── deleteresponder.js # Delete autoresponder (Admin)
│   │   ├── install.js        # Installation instructions
│   │   ├── setstatus.js      # Set bot status (Owner)
│   │   └── plugins.js        # Browse and search Aliucord plugins
│   ├── events/               # Event handler files
│   │   ├── ready.js          # Bot ready/startup logic
│   │   ├── interactionCreate.js # Command & button interactions
│   │   ├── messageCreate.js  # Message autoresponders & DM handling
│   │   └── error.js          # Error handling
│   ├── handlers/             # Module loaders
│   │   ├── commandLoader.js  # Loads all commands from commands/
│   │   └── eventLoader.js    # Loads all events from events/
│   └── utils/                # Utility modules
│       ├── database.js       # Turso database operations & data caching
│       ├── helpers.js        # Interval parsing, Minky image fetching
│       └── prefixParser.js   # Prefix command parsing utilities
├── package.json              # Dependencies and scripts
├── replit.md                 # Project documentation and changelog
└── README.md                 # Project documentation
```

## System Architecture

### Bot Framework
- **Technology**: discord.js v14 with slash commands
- **Gateway Intents**: Guilds, GuildMessages, MessageContent, and DirectMessages
- **DM Handling**: Responds to any direct message with a random Minky image

### Command System
- **Dual Command Support**: Both slash commands and prefix commands (`l!`) are supported
- **Command Types**:
  - `/minky` or `l!minky` - Image sharing with file attachments
  - `/minkyinterval` or `l!minkyinterval <interval> <#channel>` - Admin-only scheduled Minky images
  - `/stopminky` or `l!stopminky <#channel>` - Admin-only stop scheduled images
  - `/install` or `l!install` - Installation guide
  - `/addresponder` or `l!addresponder <trigger> | <response> [#channel]` - Admin-only autoresponder
  - `/deleteresponder` or `l!deleteresponder <trigger>` - Admin-only autoresponder removal
  - `/setstatus` or `l!setstatus <online|idle|dnd> <message>` - Owner-only bot status
  - `/plugins [search]` or `l!plugins [search]` - Browse Aliucord plugins with pagination
- **Permission Model**: Administrator permission checks for autoresponder and Minky interval management. Owner-only for status.

### Data Persistence
- **Database**: Turso (LibSQL) with @libsql/client
- **Tables**:
  - `autoresponders`: Stores guild_id, trigger_phrase, response, channel_id
  - `minky_intervals`: Stores guild_id, channel_id, interval_str, interval_ms
  - `bot_status`: Stores status, activity, message
- **Loading**: Data is loaded from database on bot startup
- **Persistence**: All data survives bot restarts

### Autoresponder Architecture
- **Storage**: Turso database with in-memory cache for fast access
- **Scope**: Server-specific (each Discord server maintains its own autoresponders)
- **Features**:
  - Case-insensitive trigger matching
  - Optional channel-specific restrictions
  - Persistent storage across restarts

### Interactive Components
- **Buttons**: Action rows with button builders for platform selection and pagination
- **Ephemeral Responses**: Private messages visible only to command invoker

### Authentication & Permissions
- **Bot Token**: Environment variable (`DISCORD_BOT_TOKEN`)
- **Owner ID**: Environment variable (`DISCORD_OWNER_ID`)
- **Permission Checks**: Built-in Discord permission verification

## External Dependencies

### Core Libraries
- **discord.js v14.25.1**: Discord API wrapper
- **@libsql/client**: Turso database client
- **dotenv**: Environment variable loading
- **@sapphire/snowflake**: Discord snowflake utilities

### Environment Variables
- **DISCORD_BOT_TOKEN**: Required authentication token for Discord bot API
- **DISCORD_OWNER_ID**: Owner user ID for owner-only commands
- **TURSO_CONNECTION_URL**: Turso database connection URL
- **TURSO_AUTH_TOKEN**: Turso database authentication token

### External Services
- **GitHub Releases**: Referenced in `/install` command for application downloads
- **Image Hosting**: External image URLs for Minky cat images (https://minky.materii.dev)
- **Aliucord Plugin Manifest**: https://plugins.aliucord.com/manifest.json

## Deployment Configuration

### Replit Deployment
- **Start Command**: `node src/index.js`
- **Runtime**: Node.js
- **Database**: Turso (configured via environment variables)

## Changelog

### December 2025
- December 2, 2025: Migrated to Replit environment
- December 2, 2025: Fixed URL converter for jsDelivr to GitHub raw URLs
- December 2, 2025: Removed 30-second auto-delete from l!plugins command

### November 2025
- Added prefix command support (`l!`) alongside slash commands
- Refactored bot into modular architecture
- Added /setstatus command (owner-only)
- Made /install command server-specific with Kettu and Aliucord variants
- Added /plugins command with pagination for browsing Aliucord plugins
- Switched Minky image delivery from embeds to file attachments
- Enhanced /minkyinterval to send immediate first Minky image
- Implemented automatic DM response with random Minky images
- Added /deleteresponder command
- Made autoresponders server-specific
- Added Administrator permission check for /addresponder
- Initial project setup with discord.js
