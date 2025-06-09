const sentences = [
  "Maître Corbeau sur un arbre perché",
  "Tenait en son bec un fromage",
  "Maître Renard par l'odeur alléché",
  "Lui tint à peu près ce langage",
  "Et bonjour Monsieur du Corbeau",
  "Que vous êtes joli que vous me semblez beau",
  "Sans mentir si votre ramage",
  "Se rapporte à votre plumage",
  "Vous êtes le Phénix des hôtes de ces bois",
  "À ces mots le Corbeau ne se sent pas de joie",
  "Et pour montrer sa belle voix",
  "Il ouvre un large bec laisse tomber sa proie",
  "Le Renard s'en saisit et dit Mon bon Monsieur",
  "Apprenez que tout flatteur",
  "Vit aux dépens de celui qui l'écoute",
  "Cette leçon vaut bien un fromage sans doute",
  "Le Corbeau honteux et confus",
  "Jura mais un peu tard qu'on ne l'y prendrait plus"
];

function initQuiz(dummy, pageNum) {
  const sentence = sentences[pageNum - 1];
  const words = sentence.split(" ");
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  const wordContainer = document.querySelector(".words");
  const sentenceContainer = document.querySelector(".sentence");
  let currentIndex = 0;

  shuffled.forEach(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.className = "word";
    span.addEventListener("click", () => {
      if (word === words[currentIndex]) {
        span.classList.add("correct");

        const added = document.createElement("span");
        added.textContent = word;
        added.className = "built-word";
        sentenceContainer.appendChild(added);

        span.remove();
        currentIndex++;
      } else {
        span.classList.add("wrong");
        setTimeout(() => span.classList.remove("wrong"), 500);
      }
    });
    wordContainer.appendChild(span);
  });

  document.querySelector("#refresh").addEventListener("click", () => location.reload());

  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  if (prev) prev.href = `page${String(pageNum - 1).padStart(2, '0')}.html`;
  if (next) next.href = `page${String(pageNum + 1).padStart(2, '0')}.html`;
}
