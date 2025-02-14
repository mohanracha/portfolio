// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Scroll Progress
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-content')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active'); // Close mobile menu
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when visible
                if (entry.target.classList.contains('skill-progress-fill')) {
                    entry.target.style.transform = 'scaleX(var(--progress))';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('section, .skill-progress-fill, .portfolio-item, .contact-item')
        .forEach(el => observer.observe(el));

    // Notification helper
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }
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

// Create particle effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.hero').appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
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

// Typing effect
const typingEffect = document.querySelector('.typing-effect');
if (typingEffect) {
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
}

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

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Enhanced form validation
const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }
    
    if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email';
    }
    
    if (formData.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
};

// Update the email form submission function
function sendEmail(event) {
    event.preventDefault();
    
    try {
        const name = document.getElementById('name').value.trim();
        const senderEmail = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !senderEmail || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return false;
        }

        if (!isValidEmail(senderEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        // Format email body
        const emailBody = `Name: ${name}%0D%0A%0D%0AFrom: ${senderEmail}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        // Create multiple email client links
        const mailtoLink = `mailto:mohan.student51@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=mohan.student51@gmail.com&su=${encodeURIComponent(subject)}&body=${emailBody}`;
        
        // Show loading state
        const submitButton = document.getElementById('contactForm').querySelector('button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Detect mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Create email client options dialog
            const emailDialog = document.createElement('div');
            emailDialog.className = 'email-dialog';
            emailDialog.innerHTML = `
                <div class="email-dialog-content">
                    <h3>Choose Email Client</h3>
                    <button class="email-option gmail-btn">
                        <i class="fab fa-google"></i> Gmail
                    </button>
                    <button class="email-option default-btn">
                        <i class="fas fa-envelope"></i> Default Email App
                    </button>
                    <button class="email-option cancel-btn">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            `;
            document.body.appendChild(emailDialog);

            // Add event listeners to buttons
            emailDialog.querySelector('.gmail-btn').addEventListener('click', () => {
                window.open(gmailLink, '_blank');
                closeDialog();
            });

            emailDialog.querySelector('.default-btn').addEventListener('click', () => {
                window.location.href = mailtoLink;
                closeDialog();
            });

            emailDialog.querySelector('.cancel-btn').addEventListener('click', closeDialog);

            function closeDialog() {
                emailDialog.remove();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                document.getElementById('contactForm').reset();
            }
        } else {
            // Desktop behavior
            window.location.href = mailtoLink;
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                document.getElementById('contactForm').reset();
            }, 500);
        }

    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
    
    return false;
}

// Update the scroll handler
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.sidebar');
    const heroContent = document.querySelector('.hero-content');
    const sections = document.querySelectorAll('.about, .resume, .portfolio, .contact');
    
    if (window.scrollY > window.innerHeight - 70) {
        // Add minimize class to hero content first
        heroContent.classList.add('minimize');
        
        // Show sidebar with a slight delay
        setTimeout(() => {
            sidebar.classList.add('visible');
            sections.forEach(section => section.classList.add('with-sidebar'));
        }, 300);
    } else {
        // Remove classes in reverse order
        sidebar.classList.remove('visible');
        sections.forEach(section => section.classList.remove('with-sidebar'));
        
        setTimeout(() => {
            heroContent.classList.remove('minimize');
        }, 300);
    }
});

// Add this to ensure smooth transitions when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const sidebar = document.querySelector('.sidebar');
    
    // Add initial styles
    heroContent.style.transition = 'all 0.5s ease-out';
    sidebar.style.transition = 'all 0.5s ease-out';
    
    // Check initial scroll position
    if (window.scrollY > window.innerHeight - 70) {
        heroContent.classList.add('minimize');
        sidebar.classList.add('visible');
        document.querySelectorAll('.about, .resume, .portfolio, .contact')
            .forEach(section => section.classList.add('with-sidebar'));
    }
});

// Add this to your existing script.js
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
}); 
