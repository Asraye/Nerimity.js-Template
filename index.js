import "dotenv/config";
import { Events } from "@nerimity/nerimity.js";
import client from "./client.js";
import { loadCommands } from "./utils/commandHandler.js";

/**
 * Stores all loaded commands from /commands.
 * Keys are command names, values are command objects.
 * @type {Map<string, object>}
 */
let commands = new Map();

/**
 * MESSAGE HANDLER
 * Listens to messages and processes prefix-based commands.
 */
client.on(Events.MessageCreate, async (message) => {
  // Ignore empty messages or messages from the bot itself
  if (!message?.content) return;
  if (message.user?.id === client.user?.id) return;

  /**
   * PREFIX VALIDATION
   * The bot will only listen to messages starting with the configured prefix.
   */
  const prefix = process.env.PREFIX;
  if (!prefix) {
    console.error("PREFIX missing in .env");
    return;
  }

  if (!message.content.startsWith(prefix)) return;

  /**
   * COMMAND PARSING
   * Example:
   *   "!ping hello world"
   * > commandName = "ping"
   * > args = ["hello", "world"]
   */
  const content = message.content.slice(prefix.length).trim();
  if (!content) return;

  const args = content.split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  // Find command handler
  const command = commands.get(commandName);
  if (!command) return;

  /**
   * COMMAND EXECUTION
   * Each command file must export:
   * {
   *   name: "example",
   *   description: "what it does",
   *   async execute(message, args, client) {}
   * }
   */
  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error("Command execution error:", err);
    message.reply("❌ There was an error executing that command.");
  }
});

/**
 * READY EVENT
 * Triggered when the bot logs in successfully.
 */
client.on(Events.Ready, async () => {
  console.log(
    `Logged in as ${client.user.username} | ${client.servers.cache.size} servers`
  );

  /**
   * LOAD COMMANDS
   * loadCommands() scans /commands and returns a Map of command objects.
   */
  commands = await loadCommands();
  client.commands = commands;

  /**
   * STATUS ROTATION
   * Bot cycles through activities every 15 seconds.
   * Add more objects to the array for more statuses.
   */
  const activities = [
    async () => ({ action: "Playing", name: "Nerimity" }),
  ];

  let index = 0;

  const rotateActivity = async () => {
    try {
      const activity = await activities[index % activities.length]();
      client.user.setActivity(activity);
      index++;
    } catch (err) {
      console.error("Failed to update activity:", err);
    }
  };

  rotateActivity();
  setInterval(rotateActivity, 15000);
});

/**
 * BUTTON CLICK HANDLER
 * Listens for interactions with buttons on messages.
 * This will loop through all loaded commands and trigger their 
 * 'onButtonClick' method if it exists.
 */
client.on(Events.MessageButtonClick, async (button) => {
    for (const command of commands.values()) {
        // Check if the command has a button handler defined
        if (typeof command.onButtonClick === "function") {
            try {
                /**
                 * If the command handles the button, it should return true.
                 * This prevents other commands from unnecessarily processing the same click.
                 */
                const handled = await command.onButtonClick(button, client);
                if (handled) break; 
            } catch (err) {
                console.error(`Error in button handler for command ${command.name}:`, err);
            }
        }
    }
});


/**
 * LOGIN
 * Uses the bot token from the .env file.
 */

client.login(process.env.BOT_TOKEN);
