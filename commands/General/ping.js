/**
 * Ping Command
 * ------------
 * Displays the bot's response latency.
 *
 */

export default {
  name: "ping",
  description: "Shows the bot's message latency.",

  /**
   * Execute the ping command.
   *
   * @param {object} message - The incoming Nerimity message.
   * @returns {Promise<void>}
   */
  async execute(message ) {
    const start = Date.now();

    // Initial reply
    const reply = await message.reply("Pong!");

    // Edit response with latency
    const latency = Date.now() - start;
    await reply.edit(`Pong! (${latency}ms)`);
  }
};
