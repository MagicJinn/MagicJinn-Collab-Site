const meteorContainer = document.querySelector(".meteor-container");
const slider = document.getElementById("meteorSlider"); // Get the slider element
const startY = -150; // Start above the screen
const meteorWidth = 200; // Adjust meteor width
const meteorHeight = 200; // Adjust meteor height

// Create and position the slider label
const sliderLabel = document.createElement("label");
sliderLabel.textContent = "Meteor Creation Speed:";
sliderLabel.style.position = "absolute";
sliderLabel.style.color = "#333";
sliderLabel.style.fontWeight = "bold";

// Calculate random position for the label
const labelX = Math.random() * (window.innerWidth - 200) + 100;
const labelY = Math.random() * (window.innerHeight - 200) + 100;
sliderLabel.style.left = `${labelX}px`;
sliderLabel.style.top = `${labelY}px`;

// Append the label to the body
document.body.appendChild(sliderLabel);

// Position the slider based on the label's position
slider.style.position = "absolute";
slider.style.left = `${labelX}px`;
slider.style.top = `${labelY + 30}px`; // Adjust the vertical position if needed

const p = "web_resources/"
const meteors = [{
    image: p + "youtube-logo.png",
    link: "https://www.youtube.com/@MagicJinn"
  },
  {
    image: p + "twitter-logo.png",
    link: "https://twitter.com/MagicJinn_"
  }, {
    image: p + "discord-logo.png",
    link: "https://discord.gg/bQvtauxXWp"
  }, {
    image: p + "github-logo.png",
    link: "https://github.com/MagicJinn"
  }, {
    image: p + "patreon-logo.png",
    link: "https://patreon.com/MagicJinn"
  }, {
    image: p + "twitch-logo.png",
    link: "https://twitch.tv/magicjinn"
  }, {
    image: p + "instagram-logo.png",
    link: "https://instagram.com/manderinjo"
  }
  // Add more meteor objects as needed
];

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function moveMeteor(meteor, targetX, targetY, duration) {
  const startX = parseFloat(meteor.style.left);
  const startY = parseFloat(meteor.style.top);
  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    const progress = (currentTime - startTime) / duration;

    if (progress < 3) {
      const currentX = startX + (targetX - startX) * progress;
      const currentY = startY + (targetY - startY) * progress;
      meteor.style.left = `${currentX}px`;
      meteor.style.top = `${currentY}px`;
      requestAnimationFrame(animate);
    } else {
      meteorContainer.removeChild(meteor);
    }
  }

  requestAnimationFrame(animate);

  meteor.addEventListener("click", () => {
    const meteorInfo = meteor.meteorInfo;
    window.open(meteorInfo.link, '_blank');
  });
}

function createMeteor() {
  const meteorInfo = meteors[Math.floor(Math.random() * meteors.length)];
  const meteor = document.createElement("div");
  meteor.classList.add("meteor");

  // Create the logo element with the meteor-logo class
  const logo = document.createElement("div");
  logo.classList.add("meteor-logo");
  logo.style.backgroundImage = `url("${meteorInfo.image}")`;
  meteor.appendChild(logo);

  meteorContainer.appendChild(meteor);

  const meteorStartX = window.innerWidth; // Start just off-screen to the right
  const meteorStartY = -meteorHeight; // Start above the screen
  const targetX = getRandomNumber(-1000, window.innerWidth - meteorWidth);
  const targetY = window.innerHeight; // Move to the bottom of the screen
  const distance = calculateDistance(meteorStartX, meteorStartY, targetX, targetY);
  const duration = distance;

  meteor.style.left = `${meteorStartX}px`;
  meteor.style.top = `${meteorStartY}px`;

  // Adjust the logo position within the meteor
  logo.style.width = `${meteorWidth}px`;
  logo.style.height = `${meteorHeight}px`;

  moveMeteor(meteor, targetX, targetY, duration);
  meteor.meteorInfo = meteorInfo; // Store meteorInfo as a property for click event
  const timeoutValue = parseInt(slider.value); // Get the value of the slider
  setTimeout(createMeteor, timeoutValue); // Schedule the creation of the next meteor with the adjusted timeout
}

createMeteor(); // Start the meteor creation process