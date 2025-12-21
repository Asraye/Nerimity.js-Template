/**
 * Utility to build highly customizable consistent embeds for Nerimity messages.
 */
export class EmbedBuilder {
    constructor() {
        /** @type {string} */
        this.title = "";
        /** @type {string} */
        this.url = "";
        /** @type {string} */
        this.description = "";
        /** @type {Array<{name: string, value: string, inline: boolean}>} */
        this.fields = [];
        /** @type {string} */
        this.footer = "";
        /** @type {string} */
        this.image = "";
        /** @type {string} */
        this.thumbnail = "";
        /** @type {string} */
        this.authorName = "";
        /** @type {string} */
        this.authorIcon = "";
        /** @type {string} */
        this.timestampString = "";
        /** @type {string} */
        this.accentColor = "#00d4ff"; 
        /** @type {string} */
        this.gradientColor = "";      
        /** @type {string} */
        this.headerColor = "#00d4ff";
        /** @type {string} */
        this.bodyColor = "#cbd5e0";  
        /** @type {string} */
        this.bgColor = "#1a1c23";     
        /** @type {string} */
        this.borderColor = "#2d3748";
        /** @type {string} */
        this.borderRadius = "10px";   
        /** @type {string} */
        this.embedWidth = "340px";    
    }

    /**
     * Sets the author of the embed.
     * @param {string} name - The name of the author.
     * @param {string} [icon=""] - The URL of the author icon.
     * @returns {this}
     */
    setAuthor(name, icon = "") {
        this.authorName = String(name || "");
        this.authorIcon = String(icon || "");
        return this;
    }

    /**
     * Sets the title of the embed.
     * @param {string} text - The title text.
     * @param {string} [url=""] - The URL to open when the title is clicked.
     * @returns {this}
     */
    setTitle(text, url = "") {
        this.title = String(text || "");
        this.url = url || "";
        return this;
    }

    /**
     * Sets the main description of the embed.
     * @param {string} text - The description text.
     * @returns {this}
     */
    setDescription(text) {
        this.description = String(text || "");
        return this;
    }

    // --- Styling Methods ---

    /**
     * Sets a solid accent color for the side strip.
     * @param {string} hex - The Hex color code.
     * @returns {this}
     */
    setColor(hex) {
        this.accentColor = String(hex || "#00d4ff");
        this.gradientColor = ""; 
        return this;
    }

    /**
     * Sets a vertical gradient for the side accent strip.
     * @param {string} hex1 - The top Hex color.
     * @param {string} hex2 - The bottom Hex color.
     * @returns {this}
     */
    setGradient(hex1, hex2) {
        this.accentColor = String(hex1 || "#00d4ff");
        this.gradientColor = String(hex2 || "#005f73");
        return this;
    }

    /**
     * Sets the color for Title and Field headers.
     * @param {string} hex - The Hex color code.
     * @returns {this}
     */
    setHeaderColor(hex) {
        this.headerColor = String(hex || "#00d4ff");
        return this;
    }

    /**
     * Sets the color for description and field values.
     * @param {string} hex - The Hex color code.
     * @returns {this}
     */
    setText(hex) {
        this.bodyColor = String(hex || "#cbd5e0");
        return this;
    }

    /**
     * Sets the background color of the embed.
     * @param {string} hex - The Hex color code.
     * @returns {this}
     */
    setBackground(hex) {
        this.bgColor = String(hex || "#1a1c23");
        return this;
    }

    /**
     * Sets the color of the outer border.
     * @param {string} hex - The Hex color code.
     * @returns {this}
     */
    setBorder(hex) {
        this.borderColor = String(hex || "#2d3748");
        return this;
    }

    /**
     * Sets the border radius of the embed corners.
     * @param {string} px - The radius in pixels (e.g., "12px").
     * @returns {this}
     */
    setRadius(px) {
        this.borderRadius = String(px || "10px");
        return this;
    }

    /**
     * Sets the total width of the embed.
     * @param {string} width - The width (e.g., "340px" or "100%").
     * @returns {this}
     */
    setWidth(width) {
        this.embedWidth = String(width || "340px");
        return this;
    }

    /**
     * Quickly applies an accent and background color theme.
     * @param {string} accent - The main accent Hex color.
     * @param {string} [bg="#1a1c23"] - The background Hex color.
     * @returns {this}
     */
    setTheme(accent, bg = "#1a1c23") {
        this.accentColor = accent;
        this.headerColor = accent;
        this.bgColor = bg;
        this.gradientColor = "";
        return this;
    }

    // --- Components ---

    /**
     * Adds a field to the embed.
     * @param {string} name - The name/header of the field.
     * @param {string} value - The content of the field.
     * @param {boolean} [inline=false] - Whether the field should sit inline.
     * @returns {this}
     */
    addField(name, value, inline = false) {
        if (name && value) {
            this.fields.push({ 
                name: String(name), 
                value: String(value), 
                inline: !!inline 
            });
        }
        return this;
    }

    /**
     * Sets the top-right thumbnail image.
     * @param {string} url - Image URL.
     * @returns {this}
     */
    setThumbnail(url) {
        this.thumbnail = String(url || "");
        return this;
    }

    /**
     * Sets the main large image at the bottom.
     * @param {string} url - Image URL.
     * @returns {this}
     */
    setImage(url) {
        this.image = String(url || "");
        return this;
    }

    /**
     * Sets the footer text.
     * @param {string} text - The footer content.
     * @returns {this}
     */
    setFooter(text) {
        this.footer = String(text || "");
        return this;
    }

    /**
     * Appends a UTC timestamp to the footer.
     * @returns {this}
     */
    setTimestamp() {
        const now = new Date();
        const hours = now.getUTCHours().toString().padStart(2, "0");
        const mins = now.getUTCMinutes().toString().padStart(2, "0");
        this.timestampString = `${hours}:${mins} UTC`;
        return this;
    }

    /**
     * Compiles the data into an HTML object for Nerimity.
     * @returns {{ htmlEmbed: string }}
     */
    build() {
        const authorHtml = this.authorName ? `
            <div style="display:flex; align-items:center; margin-bottom:8px;">
                ${this.authorIcon ? `<img src="${this.authorIcon}" style="width:20px; height:20px; border-radius:50%; margin-right:8px;" />` : ""}
                <span style="font-size:12px; font-weight:bold; color:#fff;">${this.authorName}</span>
            </div>` : "";

        const fieldHtml = this.fields.map(f => {
            const displayMode = f.inline ? "inline-block" : "block";
            const widthMode = f.inline ? "calc(50% - 10px)" : "100%";
            return `
                <div style="display:${displayMode}; width:${widthMode}; margin-top:10px; vertical-align:top; margin-right:5px;">
                    <div style="font-weight:bold; color:${this.headerColor}; font-size:11px;">${f.name}</div>
                    <div style="font-size:13px; color:${this.bodyColor};">${f.value}</div>
                </div>`;
        }).join("");

        const parts = [];
        const safeFooter = String(this.footer || "");
        if (safeFooter.trim().length > 0) parts.push(safeFooter.trim());
        if (this.timestampString) parts.push(this.timestampString);
        
        const footerHtml = parts.length > 0 ? `
            <div style="margin-top:12px; font-size:10px; color:#888; padding-top:4px;">
                ${parts.join(" • ")}
            </div>` : "";

        const titleHtml = this.title ? `
            <div style="margin-bottom:4px;">
                ${this.url 
                    ? `<a href="${this.url}" style="font-weight:bold; color:${this.headerColor}; font-size:15px; text-decoration:none;">${this.title}</a>`
                    : `<span style="font-weight:bold; color:${this.headerColor}; font-size:15px;">${this.title}</span>`
                }
            </div>` : "";

        const sideStyle = this.gradientColor 
            ? `background:linear-gradient(to bottom, ${this.accentColor}, ${this.gradientColor});`
            : `background:${this.accentColor};`;

        const html = `
            <div style="display:flex; font-family:sans-serif; background:${this.bgColor}; border-radius:${this.borderRadius}; color:#fff; width:${this.embedWidth}; overflow:hidden; border:1px solid ${this.borderColor};">
                <div style="${sideStyle} width:4px;"></div>
                <div style="padding:14px; flex:1;">
                    <div style="display:flex; justify-content:space-between;">
                        <div style="flex:1;">
                            ${authorHtml}
                            ${titleHtml}
                            ${this.description ? `<div style="font-size:13px; line-height:1.5; color:${this.bodyColor}; white-space:pre-wrap;">${this.description}</div>` : ""}
                        </div>
                        ${this.thumbnail ? `<img src="${this.thumbnail}" style="width:60px; height:60px; border-radius:4px; margin-left:12px; object-fit:cover;" />` : ""}
                    </div>
                    ${fieldHtml}
                    ${this.image ? `<img src="${this.image}" style="margin-top:12px; border-radius:4px; max-width:100%; display:block;" />` : ""}
                    ${footerHtml}
                </div>
            </div>`;

        return { htmlEmbed: html };
    }
}
