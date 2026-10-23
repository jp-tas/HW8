const sampleForm = document.getElementById("sample-form");
const resultsSection = document.getElementById("form-results");
const resultsBody = document.querySelector("#form-data tbody");

sampleForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(sampleForm);
  resultsBody.replaceChildren();

  for (const [key, value] of formData.entries()) {
    const row = document.createElement("tr");
    const keyCell = document.createElement("td");
    const valueCell = document.createElement("td");
    keyCell.textContent = key;
    valueCell.textContent = value;
    row.append(keyCell, valueCell);
    resultsBody.appendChild(row);
  }

  resultsSection.hidden = false;
});

sampleForm.addEventListener("reset", () => {
  resultsBody.replaceChildren();
  resultsSection.hidden = true;
});
