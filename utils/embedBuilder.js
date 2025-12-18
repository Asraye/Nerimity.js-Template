/**
 * Utility to build consistent embeds for Nerimity messages.
 */
export class EmbedBuilder {
    constructor() {
        /** @type {string} */
        this.title = "";
        /** @type {string} */
        this.description = "";
        /** @type {Array<{name: string, value: string}>} */
        this.fields = [];
        /** @type {string} */
        this.color = "#5865F2"; 
        /** @type {string} */
        this.footer = "";
    }

    /**
     * Sets the title of the embed.
     * @param {string} text - The title text.
     * @returns {this}
     */
    setTitle(text) {
        this.title = text;
        return this;
    }

    /**
     * Sets the main description of the embed.
     * @param {string} text - The description text.
     * @returns {this}
     */
    setDescription(text) {
        this.description = text;
        return this;
    }

    /**
     * Sets the accent color of the embed.
     * @param {string} hex - The hex color code (e.g., "#FF0000").
     * @returns {this}
     */
    setColor(hex) {
        this.color = hex;
        return this;
    }

    /**
     * Adds a field to the embed with a label and value.
     * @param {string} name - The field name/label.
     * @param {string} value - The content of the field.
     * @returns {this}
     */
    addField(name, value) {
        this.fields.push({ name, value });
        return this;
    }

    /**
     * Sets the footer text at the bottom of the embed.
     * @param {string} text - The footer text.
     * @returns {this}
     */
    setFooter(text) {
        this.footer = text;
        return this;
    }

    /**
     * Compiles the embed properties into an HTML string for Nerimity.
     * @returns {string} The generated HTML string.
     */
    build() {
        const fieldHtml = this.fields.map(f => `
            <div style="margin-top:10px;">
                <div style="font-weight:bold; color:${this.color}; font-size:11px;">${f.name}</div>
                <div style="font-size:13px; color:#ddd;">${f.value}</div>
            </div>`).join("");

        const footerHtml = this.footer ? `
            <div style="margin-top:12px; font-size:10px; color:#888; padding-top:8px;">
                ${this.footer}
            </div>` : "";

        return `
            <div style="display:flex; font-family:monospace; background:#111; border-radius:8px; color:#fff; width:320px; overflow:hidden;">
                <div style="background:${this.color}; width:4px;"></div>
                <div style="padding:12px; flex:1;">
                    ${this.title ? `<div style="font-weight:bold; color:${this.color}; font-size:14px; margin-bottom:4px;">${this.title}</div>` : ""}
                    ${this.description ? `<div style="font-size:13px; line-height:1.4;">${this.description}</div>` : ""}
                    ${fieldHtml}
                    ${footerHtml}
                </div>
            </div>`;
    }
}