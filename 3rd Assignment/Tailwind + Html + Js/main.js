 // Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {b 
            navLinks.classList.toggle('active');
            
            // Change icon based on menu 
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks?.contains(event.target);
        const isClickOnHamburger = hamburger?.contains(event.target);
        
        if (navLinks?.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            navLinks.classList.remove('active');
            
            // Reset hamburger icon
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Password Visibility Toggle
    const togglePassword = document.querySelectorAll('.toggle-password');
    
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class for this FAQ item
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Show active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            if (currentPage === '' && linkHref === 'index.html') {
                link.classList.add('active');
            } else if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Call this function to set the active nav link
    setActiveNavLink();
    
    // Add animation to elements when they come into view
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.card, .step, .testimonial, .team-member, .value-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
    
    // Call the animation function
    animateOnScroll();
});
