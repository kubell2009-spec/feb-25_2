/* shared.js
   Import these helpers in a <script type="module"> block.
   Theme argument must be "white" or "black".
*/

function validateTheme(theme) {
    if (theme !== "white" && theme !== "black") {
        throw new Error('Theme must be either "white" or "black".');
    }
    return theme;
}

/**
 * Create text that contrasts with the chosen background.
 * Example: makeText("Welcome!", "black")
 */
export function makeText(text, background = "black", tag = "span") {
    validateTheme(background);

    const allowedTags = new Set(["span", "p", "div", "label", "h1", "h2", "h3"]);
    if (!allowedTags.has(tag)) {
        throw new Error("Unsupported text tag.");
    }

    const element = document.createElement(tag);
    element.classList.add("shared-text", background === "white" ? "theme-white" : "theme-black");
    element.textContent = text;
    return element;
}

/**
 * Create a line break. Append the returned element wherever the break is needed.
 * Example: container.append(makeText("First line"), lineBreak(), makeText("Second line"))
 */
export function lineBreak() {
    return document.createElement("br");
}

/**
 * Create a button with inverted black/white styling.
 * onClick is optional and should be a function.
 * Example: makeButton("Enter", "white", () => checkPassword())
 */
export function makeButton(label, background = "black", onClick = null) {
    validateTheme(background);

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add(
        "shared-button",
        background === "white" ? "button-on-white" : "button-on-black"
    );
    button.textContent = label;

    if (onClick !== null) {
        if (typeof onClick !== "function") {
            throw new TypeError("onClick must be a function or null.");
        }
        button.addEventListener("click", onClick);
    }

    return button;
}

/**
 * Create an editable input. Use type="password" for password entry.
 * Example: makeInput("Enter password", "white", "password")
 */
export function makeInput(placeholder = "", background = "black", type = "text") {
    validateTheme(background);

    const allowedTypes = new Set(["text", "password", "email", "number"]);
    if (!allowedTypes.has(type)) {
        throw new Error("Input type must be text, password, email, or number.");
    }

    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.classList.add(
        "shared-input",
        background === "white" ? "input-on-white" : "input-on-black"
    );
    input.autocomplete = type === "password" ? "current-password" : "off";
    return input;
}
