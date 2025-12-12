# Nerimity Bot

A modular Nerimity bot template, With: help system, ping command, and a basic command handler.
This project is designed as a clean starter template for building bots with `@nerimity/nerimity.js`

---

## Features

* Modular command handler
* Automatic command grouping by category in `;help`
* Cooldown system for commands
* Ping command to check bot latency
* Fully documented, ES module-based structure

---

## Project Structure

```
nerimity-bot/
├─ commands/
│  ├─ help.js       # Displays all commands
│  └─ ping.js       # Responds with bot latency
├─ utils/
│  └─ commandHandler.js  # Loads commands and handles cooldowns
├─ client.js        # Single shared Nerimity client
├─ index.js         # Main bot entry point
├─ .env.example     # Environment variables template
├─ package.json
└─ README.md
```

---

## Setup

1. **Clone the repository**

```bash
git clone github.com/Asraye/Nerimity.js-Template/ nerimity-bot
cd nerimity-bot
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

Copy `.env.example` to `.env` and fill in your bot token and prefix:

```env
BOT_TOKEN=your-bot-token-here
PREFIX=;
```

4. **Start the bot**

* Development mode (auto-reload on changes in commands or utils):

```bash
npm run dev
```

* Production mode:

```bash
npm start
```

---

## Commands

### `;help`

Displays all loaded commands grouped by category.

### `;ping`

Replies with "Pong!" and the bot's response latency.

> Add more commands by creating `.js` files in the `/commands` folder in whichever category

---

## Command Template

```js
export default {
  name: "example",
  description: "Describe what this command does",
  category: "General",
  usage: "example <args>",
  aliases: [],
  cooldown: 3, // in seconds

  async execute(message, args, client) {
    // Command logic
  }
};
```

---

## Environment Variables

| Variable    | Description                              |
| ----------- | ---------------------------------------- |
| `BOT_TOKEN` | Nerimity bot token           |
| `PREFIX`    | Prefix for all commands  |

---

## Scripts

* `npm start` - Runs the bot
* `npm run dev` - Runs the bot in dev mode with `nodemon`
---

## Contributing

1. Fork the repository
2. Create your feature branch
3. Add commands under `/commands`
4. Ensure proper JSDoc comments
5. Submit a pull request
