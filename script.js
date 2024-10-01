const cards = [
    "Your eyes sparkle like the stars in the night sky, guiding me home.",
    "Your smile is like a ray of sunshine, brightening even the darkest days.",
    "Your laughter is music to my ears, a melody I want to hear forever.",
    "Your kindness knows no bounds, touching hearts wherever you go.",
    "Your intelligence is captivating, always leaving me in awe.",
    "Your presence is a gift, making every moment special and unforgettable."
];

let crushName = "";
let currentCard = 0;
let crushImage = null;

function startProposal() {
    crushName = document.getElementById("crush-name").value.trim();
    const imageFile = document.getElementById("image-upload").files[0];

    if (crushName === "") {
        alert("Please enter your name.");
        return;
    }

    if (!imageFile) {
        alert("Please upload an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        crushImage = e.target.result;
    };
    reader.readAsDataURL(imageFile);

    document.getElementById("name-input").style.display = "none";
    document.getElementById("cards-container").style.display = "block";

    showNextCard();
    playBackgroundMusic();
    createFloatingElements();
}

function showNextCard() {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (currentCard < cards.length) {
        // Add instruction text
        const instruction = document.createElement("p");
        instruction.id = "click-instruction";
        instruction.textContent = "Click the card to continue";
        container.appendChild(instruction);

        // Create and add the card
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = cards[currentCard];
        card.onclick = () => {
            currentCard++;
            showNextCard();
        };
        container.appendChild(card);
    } else {
        showProposal();
    }
}


function showProposal() {
    document.getElementById("cards-container").style.display = "none";
    document.getElementById("proposal").style.display = "block";
    document.getElementById("proposal-name").textContent = crushName;
}

function moveButton() {
    const button = document.getElementById("no-button");
    const container = document.getElementById("proposal");
    const maxX = container.clientWidth - button.clientWidth;
    const maxY = container.clientHeight - button.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

function acceptProposal() {
    document.getElementById("proposal").style.display = "none";
    document.getElementById("final-message").style.display = "block";
    document.getElementById("final-name").textContent = crushName;

    setTimeout(() => {
        showFinalImage();
    }, 5000);
}

function showFinalImage() {
    const finalImage = document.getElementById("final-image");
    finalImage.src = crushImage;
    const finalImagePage = document.getElementById("final-image-page");
    finalImagePage.style.display = "flex";
    
    setTimeout(() => {
        finalImagePage.style.opacity = "1";
        showFloatingText();
        createSmallHearts();
        continuouslyCreateHearts();
    }, 100);
}

function createSmallHearts() {
    const container = document.getElementById('small-hearts-container');
    const heartSymbol = '❤';
    
    for (let i = 0; i < 50; i++) {
        createHeart(container, heartSymbol);
    }
}

function continuouslyCreateHearts() {
    setInterval(() => {
        const container = document.getElementById('small-hearts-container');
        createHeart(container, '❤');
    }, 200);
}

function createHeart(container, symbol) {
    const heart = document.createElement('div');
    heart.className = 'small-heart';
    heart.textContent = symbol;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`; 
    container.appendChild(heart);
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function showFloatingText() {
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach((text, index) => {
        setTimeout(() => {
            text.style.opacity = "1";
        }, index * 1000);
    });
}

function createSmallHearts() {
    const container = document.getElementById('small-hearts-container');
    const heartSymbol = '❤';
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'small-heart';
        heart.textContent = heartSymbol;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(heart);
    }
}

function continuouslyCreateHearts() {
    setInterval(() => {
        const container = document.getElementById('small-hearts-container');
        const heart = document.createElement('div');
        heart.className = 'small-heart';
        heart.textContent = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 200);
}

function createFloatingElements() {
    const elements = ['❤️', '🧸'];
    const container = document.body;

    setInterval(() => {
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.className = element.textContent === '❤️' ? 'heart' : 'teddy';
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        container.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 5000);
    }, 300);
}

function playBackgroundMusic() {
    const audio = document.getElementById("background-music");
    audio.play();
}

// Event listener for the "No" button
document.getElementById("no-button").addEventListener("mouseover", moveButton);

// Initial setup
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cards-container").style.display = "none";
    document.getElementById("proposal").style.display = "none";
    document.getElementById("final-message").style.display = "none";
    document.getElementById("final-image-page").style.display = "none";
});
