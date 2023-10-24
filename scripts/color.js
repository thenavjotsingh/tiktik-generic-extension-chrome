function generateRandomGradient() {
    const startColor = getRandomColor();
    const endColor = getRandomColor();
    const gradient = `linear-gradient(to bottom, ${startColor}, ${endColor})`;
    return gradient;
}


function getRandomColor() {
    const colors = ['#494B4D', '#939799', '#D9C3BA', '#8C8380'];
    let color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

// Set the background gradient on page load
document.body.style.background = generateRandomGradient();
