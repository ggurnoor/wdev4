document.addEventListener('DOMContentLoaded', () => {
    console.log('Website Loaded Successfully');

    // Smooth scrolling when navigation buttons are clicked
    document.querySelectorAll('#nav-buttons button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(button.getAttribute('onclick').replace('showSection(\'', '').replace('\')', ''));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Show the selected section and hide others
    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Scroll-to-top button functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑ Top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.padding = '10px 15px';
    scrollToTopBtn.style.backgroundColor = 'rgba(123, 2, 2, 0.788)';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '5px';
    scrollToTopBtn.style.cursor = 'pointer';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older browsers
    });

    // Detect scroll position and adjust the scroll-to-top button and section visibility
    document.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollTop > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        // Section fade-in effect
        document.querySelectorAll('.section').forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = document.documentElement.clientHeight / 1.3;

            if (sectionPosition < screenPosition) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize section visibility for fade-in effect
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        let isValid = true;
    
        // Get all form controls
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
    
        // Validate First Name
        if (firstName.value.trim() === '') {
            alert('First Name is required');
            firstName.focus();
            isValid = false;
        }
    
        // Validate Last Name
        if (isValid && lastName.value.trim() === '') {
            alert('Last Name is required');
            lastName.focus();
            isValid = false;
        }
    
        // Validate Email
        if (isValid && email.value.trim() === '') {
            alert('Email is required');
            email.focus();
            isValid = false;
        } else if (isValid && !validateEmail(email.value)) {
            alert('Please enter a valid Email address');
            email.focus();
            isValid = false;
        }
    
        // Validate Message
        if (isValid && message.value.trim() === '') {
            alert('Message is required');
            message.focus();
            isValid = false;
        }
    
        // If any field is invalid, prevent form submission
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    

    // Make the function accessible globally
    window.showSection = showSection;
});
