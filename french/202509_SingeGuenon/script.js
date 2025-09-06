const sections = [
    {
        lines: [
            "La guenon, ",
            "le singe  ",
            "et  ",
            "la noix",
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Une jeune  ",
            "guenon  ",
            "cueillit",
            " une noix",
            " dans sa  ",
            "coque verte ;"
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Elle y porte  ",
            "la dent,",
            " fait  ",
            "la grimace...  ",
            "ah ! Certe,",
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Dit-elle,",
            " ma mère mentit",
            " quand elle m'assura que  ",
            "les noix étaient bonnes."
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Puis, croyez aux  ",
            "discours",
            " de ces vieilles  ",
            "personnes",
            " qui trompent  ",
            "la jeunesse !"
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Au diable soit  ",
            "le fruit !",
            " Elle jette  ",
            "la noix.",
            " Un singe  ",
            "la ramasse,"
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Vite entre  ",
            "deux cailloux  ",
            "la casse,",
            " l’épluche,  ",
            "la mange,",
            " et lui dit :"
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Votre mère eut raison,  ",
            "ma mie :",
            " Les noix ont  ",
            "fort bon goût,",
            " mais il faut  ",
            "les ouvrir."
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Souvenez-vous que,  ",
            "dans la vie,",
            " sans un peu  ",
            "de travail",
            " on n’a point  ",
            "de plaisir."
        ],
        image: "images/01.jpg"
    },
    {
        lines: [
            "Jean-Pierre  ",
            "Claris  ",
            "de  ",
            "FLORIAN",
            " 1755 - 1794"
        ],
        image: "images/01.jpg"
    }
];

let currentSection = 0;

const poemSection = document.getElementById("poem-section");
const sectionImage = document.getElementById("section-image");
const placeholders = document.getElementById("placeholders");
const scrambledLines = document.getElementById("scrambled-lines");

function renderSection() {
    placeholders.innerHTML = "";
    scrambledLines.innerHTML = "";

    sections[currentSection].lines.forEach(() => {
        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.textContent = "Drop here";
        placeholders.appendChild(placeholder);
    });

    const shuffledLines = [...sections[currentSection].lines].sort(() => Math.random() - 0.5);
    shuffledLines.forEach(line => {
        const lineElement = document.createElement("div");
        lineElement.classList.add("poem-line");
        lineElement.draggable = true;
        lineElement.textContent = line;
        scrambledLines.appendChild(lineElement);
    });

    sectionImage.src = sections[currentSection].image;
    addDragAndDrop();
}

function addDragAndDrop() {
    const lines = document.querySelectorAll(".poem-line");
    const dropZones = document.querySelectorAll(".placeholder");

    lines.forEach(line => {
        line.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text", event.target.textContent);
        });
    });

    dropZones.forEach((zone, index) => {
        zone.addEventListener("dragover", event => {
            event.preventDefault();
        });

        zone.addEventListener("drop", event => {
            const draggedLine = event.dataTransfer.getData("text");

            if (sections[currentSection].lines[index] === draggedLine && !zone.classList.contains("correct")) {
                zone.textContent = draggedLine;
                zone.classList.add("correct");

                const correctLine = Array.from(scrambledLines.children).find(child => child.textContent === draggedLine);
                if (correctLine) correctLine.remove();
            }
        });
    });
}

function setupNavigation() {
    document.getElementById("prev-section").addEventListener("click", () => {
        if (currentSection > 0) {
            currentSection--;
            renderSection();
        }
    });

    document.getElementById("next-section").addEventListener("click", () => {
        if (currentSection < sections.length - 1) {
            currentSection++;
            renderSection();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderSection();
    setupNavigation();
});
