document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add navbar background color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add loading state to button
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Here you would typically send the form data to your backend
        // For now, we'll just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// Intersection Observer for smooth section reveals
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-category')) {
                animateSkills(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections and skill categories
document.querySelectorAll('section, .skill-category').forEach(el => {
    observer.observe(el);
});

// Animate skill bars
function animateSkills(skillCategory) {
    const skills = skillCategory.querySelectorAll('li');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.transform = 'translateX(0)';
            skill.style.opacity = '1';
        }, index * 100);
    });
}

// Particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero title
const heroTitle = document.querySelector('.hero h2');
typeWriter(heroTitle, heroTitle.textContent);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Typing effect
const typingEffect = document.querySelector('.typing-effect');
const words = ['Software Engineer', 'AI Enthusiast', 'Cloud Developer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingEffect.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEffect.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

type();

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scaleX(1)';
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Add animated background
function createAnimatedBackground() {
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    
    for(let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.style.width = '2px';
        span.style.height = '2px';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 5 + 's';
        bg.appendChild(span);
    }
    
    document.body.appendChild(bg);
}

createAnimatedBackground();

// Smooth scroll with progress indicator
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.querySelector(':root').style.setProperty('--scroll-progress', scrolled + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// Parallax effect for sections
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const speed = section.dataset.speed || 0.5;
        const offset = window.pageYOffset;
        section.style.transform = `translateY(${offset * speed}px)`;
    });
});

// Enhanced skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const percentage = bar.dataset.percentage || '0';
        
        progress.style.width = '0%';
        progress.style.transition = 'width 1.5s ease-in-out';
        
        const percentageEl = document.createElement('span');
        percentageEl.className = 'percentage';
        percentageEl.textContent = percentage + '%';
        bar.appendChild(percentageEl);
        
        setTimeout(() => {
            progress.style.width = percentage + '%';
        }, 100);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    createAnimatedBackground();
});

// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Form validation feedback
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('blur', function() {
        const formGroup = this.closest('.form-group');
        if (this.value.trim() !== '') {
            formGroup.classList.add('success');
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
        }
    });
});

// Success message handler
function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.classList.add('success-message');
    successMsg.textContent = message;
    document.body.appendChild(successMsg);
    
    setTimeout(() => successMsg.classList.add('show'), 100);
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => successMsg.remove(), 300);
    }, 3000);
}

// Add loading state to buttons
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Add tooltips to social links
document.querySelectorAll('.social-links a').forEach(link => {
    const tooltip = link.getAttribute('title');
    if (tooltip) {
        link.setAttribute('data-tooltip', tooltip);
        link.removeAttribute('title');
    }
});

// Enhanced Form Validation
function validateForm() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    let isValid = true;

    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                setInputError(formGroup, 'Please enter a valid email');
                isValid = false;
            } else {
                setInputSuccess(formGroup);
            }
        } else if (value === '') {
            setInputError(formGroup, 'This field is required');
            isValid = false;
        } else {
            setInputSuccess(formGroup);
        }
    });

    return isValid;
}

function setInputError(formGroup, message) {
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    const feedback = formGroup.querySelector('.feedback') || createFeedbackElement(formGroup);
    feedback.textContent = message;
    feedback.className = 'feedback error';
}

function setInputSuccess(formGroup) {
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    const feedback = formGroup.querySelector('.feedback');
    if (feedback) feedback.remove();
}

// Enhanced Button Interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', createButtonGlow);
    button.addEventListener('mouseleave', removeButtonGlow);
});

function createButtonGlow(e) {
    const button = e.target;
    const glow = document.createElement('div');
    glow.className = 'button-glow';
    button.appendChild(glow);
}

function removeButtonGlow(e) {
    const button = e.target;
    const glow = button.querySelector('.button-glow');
    if (glow) {
        glow.addEventListener('transitionend', () => glow.remove());
        glow.style.opacity = '0';
    }
}

// 3D Tilt Effect for Portfolio Cards
function initPortfolioTilt() {
    const cards = document.querySelectorAll('.portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (-mouseY / (cardHeight / 2)) * 10; // Max 10 degrees
    const rotateY = (mouseX / (cardWidth / 2)) * 10; // Max 10 degrees

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(50px)
    `;

    // Update shine effect position
    const shine = card.querySelector('.shine-effect');
    if (shine) {
        const moveX = (mouseX / cardWidth) * 150;
        const moveY = (mouseY / cardHeight) * 150;
        shine.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

function handleMouseEnter(e) {
    const card = e.currentTarget;
    card.style.transition = 'none'; // Remove transition for smooth tilt
    
    // Add shine effect
    if (!card.querySelector('.shine-effect')) {
        const shine = document.createElement('div');
        shine.className = 'shine-effect';
        card.appendChild(shine);
    }
}

function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transition = 'all 0.5s var(--transition-timing)';
    card.style.transform = `
        perspective(1000px)
        rotateX(0)
        rotateY(0)
        translateZ(0)
    `;
    
    // Remove shine effect
    const shine = card.querySelector('.shine-effect');
    if (shine) {
        shine.remove();
    }
}

// Initialize tilt effect when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolioTilt); 
