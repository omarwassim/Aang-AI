// DOM Elements
const pickAvatarBtn = document.getElementById('pickAvatarBtn');
const avatarsSection = document.querySelector('.avatars-section');
const avatarCards = document.querySelectorAll('.avatar-card');
const characterCards = document.querySelectorAll('.character-card');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeNavigation();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Pick Avatar button functionality
    pickAvatarBtn.addEventListener('click', toggleAvatarsSection);
    
    // Avatar card hover effects for card navigation
    avatarCards.forEach(avatarCard => {
        avatarCard.addEventListener('mouseenter', handleAvatarHover);
        avatarCard.addEventListener('click', handleAvatarClick);
    });
    
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Toggle the avatars section visibility
function toggleAvatarsSection() {
    const isHidden = avatarsSection.classList.contains('hidden');
    
    if (isHidden) {
        // Show avatars section
        avatarsSection.classList.remove('hidden');
        pickAvatarBtn.textContent = 'Hide Avatars';
        pickAvatarBtn.style.background = 'linear-gradient(45deg, #764ba2, #667eea)';
        
        // Scroll to avatars section
        setTimeout(() => {
            avatarsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    } else {
        // Hide avatars section
        avatarsSection.classList.add('hidden');
        pickAvatarBtn.textContent = 'Pick an Avatar';
        pickAvatarBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
    }
}

// Handle avatar card hover to show corresponding character card
function handleAvatarHover(event) {
    const avatarCard = event.currentTarget;
    const cardId = avatarCard.getAttribute('data-card');
    
    // Add hover effect to avatar card
    avatarCard.style.transform = 'translateY(-15px) scale(1.05)';
    avatarCard.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    
    // Show corresponding character card
    showCharacterCard(cardId);
}

// Handle avatar card click for mobile devices
function handleAvatarClick(event) {
    const avatarCard = event.currentTarget;
    const cardId = avatarCard.getAttribute('data-card');
    
    // Show corresponding character card
    showCharacterCard(cardId);
    
    // Scroll to cards section
    setTimeout(() => {
        document.querySelector('.cards-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// Show specific character card
function showCharacterCard(cardId) {
    // Hide all character cards
    characterCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show the selected character card
    const targetCard = document.getElementById(cardId);
    if (targetCard) {
        setTimeout(() => {
            targetCard.classList.add('active');
        }, 100);
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    // Set up intersection observer for active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-70px 0px -70px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                updateActiveNavLink(sectionId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Handle smooth scrolling for navigation links
function handleSmoothScroll(event) {
    event.preventDefault();
    
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Reset hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const avatarFrame = document.querySelector('.avatar-frame');
    
    if (heroSection && avatarFrame) {
        const rate = scrolled * -0.5;
        avatarFrame.style.transform = `translateY(${rate}px)`;
    }
});

// Add entrance animations
function addEntranceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for entrance animations
    const animatedElements = document.querySelectorAll('.avatar-card, .character-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize entrance animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addEntranceAnimations);

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to close avatars section
    if (event.key === 'Escape') {
        if (!avatarsSection.classList.contains('hidden')) {
            toggleAvatarsSection();
        }
        closeMobileMenu();
    }
    
    // Arrow keys for card navigation
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const activeCard = document.querySelector('.character-card.active');
        if (activeCard) {
            const currentIndex = Array.from(characterCards).indexOf(activeCard);
            let nextIndex;
            
            if (event.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : characterCards.length - 1;
            } else {
                nextIndex = currentIndex < characterCards.length - 1 ? currentIndex + 1 : 0;
            }
            
            const nextCard = characterCards[nextIndex];
            const cardId = nextCard.getAttribute('id');
            showCharacterCard(cardId);
        }
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe up - show next card
            const activeCard = document.querySelector('.character-card.active');
            if (activeCard) {
                const currentIndex = Array.from(characterCards).indexOf(activeCard);
                const nextIndex = currentIndex < characterCards.length - 1 ? currentIndex + 1 : 0;
                const nextCard = characterCards[nextIndex];
                const cardId = nextCard.getAttribute('id');
                showCharacterCard(cardId);
            }
        } else {
            // Swipe down - show previous card
            const activeCard = document.querySelector('.character-card.active');
            if (activeCard) {
                const currentIndex = Array.from(characterCards).indexOf(activeCard);
                const nextIndex = currentIndex > 0 ? currentIndex - 1 : characterCards.length - 1;
                const nextCard = characterCards[nextIndex];
                const cardId = nextCard.getAttribute('id');
                showCharacterCard(cardId);
            }
        }
    }
}

