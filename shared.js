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
export function makeText(text, tag = "span") {
    const element = document.createElement(tag);
    element.classList.add("shared-text");
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

export function makeButton(label, onClick = null, scrollToTop = false) {
    const button = document.createElement("button");

    button.classList.add("shared-button");
    button.textContent = label;

    if (typeof onClick === "function") {
        button.addEventListener("click", onClick);
    }

    if (scrollToTop) {
        button.addEventListener("click", () => {
            const scrollContainer = document.querySelector(".shared-page");

            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        });
    }

    return button;
}


/**
 * Create an editable input. Use type="password" for password entry.
 * Example: makeInput("Enter password", "white", "password")
 */
export function makeInput(placeholder = "", type = "text") {
    const allowedTypes = new Set(["text", "password", "email", "number"]);

   if (!allowedTypes.has(type)) {
        throw new Error("Input type must be text, password, email, or number.");
    }

    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.classList.add("shared-input");
    input.autocomplete = type === "password" ? "current-password" : "off";
    return input;
}

export function makePasswordCheck({
    input,
    correctPassword,
    onCorrect = () => {},
    onIncorrect = () => {}
}) {
    function check() {
        if (input.value === correctPassword) {
            onCorrect();
        } else {
            onIncorrect();
        }
    }

    return check;
}


export function distorttext(text, intensity = 5) {
    const element = document.createElement("span");

    element.classList.add("shared-text", "zalgo-text");
    element.setAttribute("aria-label", text);

    const topMarks = [
        "\u0300", "\u0301", "\u0302", "\u0303",
        "\u0304", "\u0305", "\u0306", "\u0307",
        "\u0308", "\u0309", "\u030A", "\u030B",
        "\u030C", "\u030D", "\u030E", "\u030F",
        "\u0310", "\u0311", "\u0312", "\u0313"
    ];

    const middleMarks = [
        "\u0315", "\u0334", "\u0335", "\u0336",
        "\u0337", "\u0338", "\u034F"
    ];

    const bottomMarks = [
        "\u0316", "\u0317", "\u0318", "\u0319",
        "\u031A", "\u031B", "\u031C", "\u031D",
        "\u031E", "\u031F", "\u0320", "\u0321",
        "\u0322", "\u0323", "\u0324", "\u0325",
        "\u0326", "\u0327", "\u0328", "\u0329"
    ];

    const allMarks = [
        ...topMarks,
        ...middleMarks,
        ...bottomMarks
    ];

    for (const character of Array.from(text)) {
        const characterSpan = document.createElement("span");

        let corrupted = character;

        const amount = Math.floor(
            Math.random() * (intensity + 1)
        );

        for (let i = 0; i < amount; i++) {
            const marks = [
                topMarks,
                middleMarks,
                bottomMarks
            ];

            const category = marks[
                Math.floor(Math.random() * marks.length)
            ];

            corrupted += category[
                Math.floor(Math.random() * category.length)
            ];
        }

        const base = document.createElement("span");
        base.classList.add("zalgo-base");
        base.textContent = character;

        const addons = document.createElement("span");
        addons.classList.add("zalgo-addons");
        addons.textContent = corrupted.slice(character.length);

        characterSpan.append(base, addons);
        characterSpan.classList.add("zalgo-character");

        element.append(characterSpan);
    }

    return element;
}
