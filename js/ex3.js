// The assignment explicitly permits invented country and year data.
const travelData = {
  name: "Jean-Pierre Tas",
  countries: [
    { name: "France", year: 2022 },
    { name: "Canada", year: 2023 },
    { name: "Japan", year: 2024 }
  ]
};

const sendButton = document.getElementById("send-button");
const statusElement = document.getElementById("status");
document.getElementById("travel-data").textContent = JSON.stringify(travelData, null, 2);

sendButton.addEventListener("click", () => {
  sendButton.disabled = true;
  statusElement.textContent = "Sending travel data...";

  fetch("https://thejsway-server.herokuapp.com/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(travelData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(message => {
      console.log("Server response:", message);
      statusElement.textContent = message
        ? `Server response: ${message}`
        : "The request completed, but the server returned an empty response.";
    })
    .catch(error => {
      statusElement.textContent = `Could not send travel data: ${error.message}`;
      console.error("Could not send travel data:", error);
    })
    .finally(() => {
      sendButton.disabled = false;
    });
});
