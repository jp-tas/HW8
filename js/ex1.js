const paintingsBody = document.querySelector("#paintings tbody");
const statusElement = document.getElementById("status");

fetch("https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/paintings.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then(paintings => {
    if (!Array.isArray(paintings)) {
      throw new Error("The server did not return a paintings array.");
    }
    for (const painting of paintings) {
      const row = document.createElement("tr");
      for (const value of [painting.name, painting.year, painting.artist]) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      }
      paintingsBody.appendChild(row);
    }
    statusElement.textContent = paintings.length === 0 ? "No paintings found." : "";
  })
  .catch(error => {
    statusElement.textContent = `Could not load paintings: ${error.message}`;
    console.error("Could not load paintings:", error);
  });
