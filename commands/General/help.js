/**
 * Help Command
 * ------------
 * Displays all available commands grouped by category.
 *
 * Command Object Structure:
 * {
 *   name: "help",
 *   description: "Displays all available commands",
 *   async execute(message, args, client) {}
 * }
 */

export default {
  name: "help",
  description: "Displays all available commands, grouped by category.",

  /**
   * Execute the help command.
   *
   * @param {object} message - The incoming message context from Nerimity.
   * @param {string[]} args - Arguments passed after the command name.
   * @param {object} client - Nerimity client instance, containing loaded commands.
   * @returns {Promise<void>}
   */
  async execute(message, args, client) {
    try {
      /** @type {Map<string, object>} */
      const commandsMap = client.commands || new Map();

      if (!commandsMap || commandsMap.size === 0) {
        return message.reply("❌ No commands are currently loaded.");
      }

      /**
       * Group commands by category.
       * Structure: { "Fun": [cmd1, cmd2], "General": [cmd3] }
       * @type {Record<string, object[]>}
       */
      const categories = {};
      for (const cmd of commandsMap.values()) {
        const cat = cmd.category || "General";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd);
      }

      // Build HTML sections for each category
      let htmlSections = "";
      for (const [category, cmds] of Object.entries(categories)) {
        const list = cmds
          .map(
            (c) =>
              `<div>• ${c.name} - ${c.description || "No description provided"}</div>`
          )
          .join("");

        htmlSections += `
<div style="margin-bottom:10px;">
  <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">${category}</div>
  ${list}
</div>`;
      }

      // Final styled embed
      const html = `
<div style="font-family: monospace; background-color:#000; padding:10px; border-radius:8px; color:#fff;">
  <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">Available Commands</div>
  ${htmlSections}
</div>`;

      await message.reply(undefined, { htmlEmbed: html });
    } catch (err) {
      console.error("Error in help command:", err);
      await message.reply("❌ Failed to generate help message.");
    }
  },
};
