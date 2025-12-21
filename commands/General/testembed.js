import { EmbedBuilder } from "../../utils/embedBuilder.js";

/**
 * @type {import('../../types').Command}
 */
export default {
    name: "testembed",
    description: "Tests every feature of the enhanced EmbedBuilder",
    
    /**
     * Executes the testembed command.
     * @param {import('../../types').Message} message - The message object.
     * @param {string[]} args - Command arguments.
     * @param {import('../../types').Client} client - The bot client.
     */
    async execute(message, args, client) {
        const start = Date.now();

        const embed = new EmbedBuilder()
            // .setAuthor(name, iconUrl): Adds a small header with an optional avatar.
            .setAuthor(message.user.username, "https://pbs.twimg.com/media/DvX8SvYWsAIvaAZ.jpg")
            
            // .setTitle(text, url): Sets the main bold title; clicking it opens the URL.
            .setTitle("Embed System Test", "https://nerimity.com")
            
            // .setThumbnail(url): Small image displayed in the top right corner.
            .setThumbnail("https://raw.githubusercontent.com/Nerimity/nerimity-web/main/readme-assets/banner.png")
            
            // .setDescription(text): The main body text. Supports \n for spacing.
            .setDescription("This is a test of the EmbedBuilder utility.")
                        
            // .setGradient(hex1, hex2): Creates a top-to-bottom Colour gradient on the side bar.
            .setGradient("#8A2BE2", "#00D4FF") 
            
            // .setColor(hex): Sets a solid Colour for the side bar (Commented out as we are using gradient).
            // .setColor("#3b3b3bff") 
            
            // .setText(hex): Sets the Colour for the description and field values.
            .setText("#E0E0E0")       
            
            // .setHeaderColour(hex): Sets the Colour for the Title and the names of fields.
            .setHeaderColor("#00fbff") 
            
            // .setBackground(hex): Changes the inner background Colour of the embed.
            .setBackground("#0B0C10")  
            
            // .setBorder(hex): Changes the Colour of the 1px outer stroke.
            .setBorder("#1F2833")    
            
            // .setRadius(px): Controls how rounded the corners are (e.g. 0px for BOX).
            .setRadius("15px")
            
            // .setWidth(string): Manually overrides the embed width (default 340px).
            .setWidth("380px")

            // .setTheme(accent, bg): Set accent and background at once
            // .setTheme("#5865F2", "#23272a")

            // --- COMPONENTS ---

            // .addField(name, value, inline): 'name' is the header, 'value' is the body. 
            // If inline is true, fields attempt to sit side-by-side.
            .addField("Ping", `${Date.now() - start}ms`, true)
            .addField("Status", "Online", true)
            
            // Standard Block Field (inline: false)
            .addField("Rich Content", "This field takes up the full width of the embed container.")
            
            // .setImage(url): Large image displayed at the bottom of the embed body.
            .setImage("https://raw.githubusercontent.com/Nerimity/nerimity-web/main/readme-assets/banner.png")
            
            // .setFooter(text): Small grey text at the very bottom.
            .setFooter("Embeds :D")
            
            // .setTimestamp(): Appends a manual UTC time (HH:mm UTC) to the footer.
            .setTimestamp();

        // message.reply(text, data): Here we send undefined for text and our built HTML for the data.
        return message.reply(undefined, embed.build());
    }
};