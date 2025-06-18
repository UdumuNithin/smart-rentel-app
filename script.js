// Dummy data: sample trains
const trains = [
  { number: "12627", name: "Karnataka Express", from: "Bangalore", to: "Delhi" },
  { number: "12001", name: "Shatabdi Express", from: "Chennai", to: "Mysore" },
  { number: "12951", name: "Rajdhani Express", from: "Mumbai", to: "Delhi" },
  { number: "12245", name: "Duronto Express", from: "Howrah", to: "Secunderabad" }
];

// Dummy classes
const classes = ["SL", "3A", "2A", "1A"];

// Utility: generate random seat number (between 0 and 100)
function getRandomSeats() {
  return Math.floor(Math.random() * 100);
}

// Utility: generate a random segment (from-to)
function getRandomRouteSegment(from, to) {
  const stations = [from, "Nagpur", "Bhopal", "Pune", "Hyderabad", "Kanpur", to];
  const start = Math.floor(Math.random() * (stations.length - 2));
  return {
    from: stations[start],
    to: stations[start + 1]
  };
}

// Main function to display results
function displayResults(train) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `Availability for Train: ${train.name} (${train.number})`;
  heading.className = "section-heading";
  results.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "grid grid-4";

  classes.forEach(trainClass => {
    const card = document.createElement("div");
    card.className = "card";

    const segment = getRandomRouteSegment(train.from, train.to);
    const seats = getRandomSeats();

    card.innerHTML = `
      <h3>${trainClass}</h3>
      <p><strong>Route:</strong> ${segment.from} → ${segment.to}</p>
      <p><strong>Seats Available:</strong> ${seats}</p>
    `;

    grid.appendChild(card);
  });

  results.appendChild(grid);
}

// Event: Main Search
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("trainSearch").value.toLowerCase();
  const results = document.getElementById("results");

  const foundTrain = trains.find(t =>
    t.name.toLowerCase().includes(query) || t.number.includes(query)
  );

  if (foundTrain) {
    displayResults(foundTrain);
  } else {
    results.innerHTML = `<p class="message error">Train not found. Try again.</p>`;
  }
});

// Event: Direct Train + Class Search
document.getElementById("directSearchBtn").addEventListener("click", () => {
  const number = document.getElementById("directTrainNo").value.trim();
  const trainClass = document.getElementById("directClass").value.trim().toUpperCase();
  const results = document.getElementById("results");

  const foundTrain = trains.find(t => t.number === number);

  if (foundTrain && classes.includes(trainClass)) {
    const heading = document.createElement("h2");
    heading.className = "section-heading";
    heading.textContent = `Availability for ${trainClass} in ${foundTrain.name} (${number})`;

    const segment = getRandomRouteSegment(foundTrain.from, foundTrain.to);
    const seats = getRandomSeats();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${trainClass}</h3>
      <p><strong>Route:</strong> ${segment.from} → ${segment.to}</p>
      <p><strong>Seats Available:</strong> ${seats}</p>
    `;

    results.innerHTML = "";
    results.appendChild(heading);
    results.appendChild(card);
  } else {
    results.innerHTML = `<p class="message error">Invalid train number or class.</p>`;
  }
});
