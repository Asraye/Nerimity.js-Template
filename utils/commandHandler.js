import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

/**
 * Maps the original file path > command name.
 * Used to maintain command consistency.
 * @type {Map<string, string>}
 */
const fileCommandMap = new Map();

/**
 * Load a single command file from disk.
 *
 * @param {string} fullPath - Full path to the command file.
 * @param {Map<string, object>} commandsMap - The central map storing all commands.
 * @returns {Promise<void>}
 */
async function loadCommandFile(fullPath, commandsMap) {
  try {
    const fileUrl = pathToFileURL(fullPath).href;

    // Import the command module
    const module = await import(fileUrl);
    const command = module.default;

    // Validate structure
    if (!command || typeof command.execute !== "function") {
      console.warn(`⚠️ Skipped invalid command: ${fullPath}`);
      return;
    }

    // Set defaults
    command.category = command.category || path.basename(path.dirname(fullPath));
    command.usage = command.usage || "No usage specified";
    command.cooldown = command.cooldown || 0;
    command.aliases = command.aliases || [];

    // Register command
    commandsMap.set(command.name, command);
    fileCommandMap.set(fullPath, command.name);

    // Register aliases
    for (const alias of command.aliases) {
      commandsMap.set(alias, { ...command, aliasedFrom: command.name });
    }

    console.log(`🟢 Loaded: ${command.name} (${fullPath})`);
  } catch (err) {
    console.error(`❌ Failed to load command: ${fullPath}`);
    console.error(err);
  }
}

/**
 * Recursively load all commands inside the /commands directory.
 *
 * @param {string} dir - Directory path to read.
 * @param {Map<string, object>} commandsMap - The map that stores all command objects.
 * @returns {Promise<void>}
 */
async function loadDir(dir, commandsMap) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await loadDir(fullPath, commandsMap);
    } else if (file.isFile() && file.name.endsWith(".js")) {
      await loadCommandFile(fullPath, commandsMap);
    }
  }
}

/**
 * Print a formatted summary of all loaded commands.
 *
 * @param {Map<string, object>} commandsMap - Map of all loaded commands and aliases.
 */
function logSummary(commandsMap) {
  const categories = {};
  let aliasCount = 0;

  for (const [key, cmd] of commandsMap) {
    if (cmd.aliasedFrom) {
      aliasCount++;
      continue;
    }

    if (!categories[cmd.category]) categories[cmd.category] = [];
    categories[cmd.category].push(cmd.name);
  }

  console.log("\n========== COMMAND SUMMARY ==========");

  for (const cat of Object.keys(categories)) {
    console.log(`📁 ${cat}: ${categories[cat].join(", ")}`);
  }

  console.log(`🔗 Aliases loaded: ${aliasCount}`);
  console.log(`📦 Total commands: ${commandsMap.size}`);
  console.log("=====================================\n");
}

/**
 * Load all commands from /commands.  
 *
 * @returns {Promise<Map<string, object>>} - A map of all loaded commands.
 */
export async function loadCommands() {
  const commands = new Map();

  await loadDir(path.resolve("./commands"), commands);
  logSummary(commands);

  return commands;
}

/**
 * Check and apply cooldown for a command.
 *
 * @param {object} command - The command object with a `cooldown` property.
 * @param {string} userId - The ID of the user executing the command.
 * @returns {number} Remaining cooldown (in seconds). Returns 0 if ready.
 */
export function checkCooldown(command, userId) {
  if (!command.cooldowns) {
    command.cooldowns = new Map();
  }

  const now = Date.now();
  const cooldownMs = command.cooldown * 1000;

  // No cooldown configured
  if (cooldownMs === 0) return 0;

  // Check if user is on cooldown
  if (command.cooldowns.has(userId)) {
    const expires = command.cooldowns.get(userId);
    if (now < expires) {
      return Math.ceil((expires - now) / 1000);
    }
  }

  // Apply cooldown
  command.cooldowns.set(userId, now + cooldownMs);
  return 0;
}
