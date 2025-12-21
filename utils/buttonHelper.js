/**
 * @typedef {("primary"|"success"|"danger"|"secondary")} ButtonStyleType
 */

/**
 * Standard styles for Nerimity buttons.
 * @enum {ButtonStyleType}
 */
export const ButtonStyle = {
    PRIMARY: "primary",
    SUCCESS: "success",
    DANGER: "danger",
    SECONDARY: "secondary"
};

/**
 * Creates a button object for message actions.
 * @param {string|number} id - The unique identifier for the button.
 * @param {string} label - The text displayed on the button.
 * @param {ButtonStyleType} [style=ButtonStyle.PRIMARY] - The visual style of the button.
 * @returns {{ id: string, label: string, style: ButtonStyleType }}
 */
export const createButton = (id, label, style = ButtonStyle.PRIMARY) => {
    return { 
        id: String(id), 
        label: String(label), 
        style: style 
    };
};

/**
 * Helper to create components for Modals (button.respond)
 */
export const createComponent = {
    /**
     * Creates a static text component for a modal.
     * @param {string} content - The text to display.
     * @returns {{ type: "text", content: string }}
     */
    text: (content) => ({
        type: "text",
        content: String(content)
    }),
    
    /**
     * Creates a text input field for a modal.
     * @param {string|number} id - The unique identifier for the input.
     * @param {string} label - The label shown above the input.
     * @param {string} [placeholder=""] - The placeholder text inside the input.
     * @returns {{ id: string, type: "input", label: string, placeholder: string }}
     */
    input: (id, label, placeholder = "") => ({
        id: String(id),
        type: "input",
        label: String(label),
        placeholder: String(placeholder)
    }),
    
    /**
     * Creates a dropdown selection component for a modal.
     * @param {string|number} id - The unique identifier for the dropdown.
     * @param {string} label - The label shown above the dropdown.
     * @param {Array<{id: string|number, label: string}>} [items=[]] - The list of selectable items.
     * @returns {{ id: string, type: "dropdown", label: string, items: Array<{id: string, label: string}> }}
     */
    dropdown: (id, label, items = []) => ({
        id: String(id),
        type: "dropdown",
        label: String(label),
        items: items.map(item => ({
            id: String(item.id),
            label: String(item.label)
        }))
    })
};