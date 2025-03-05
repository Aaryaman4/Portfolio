// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelectorAll('#mobile-nav a, #desktop-nav a');
    const contactForm = document.getElementById('contact-form');
    
    // Function to handle scroll effects
    function handleScroll() {
      // Add class to header when scrolled
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Check which section is currently visible
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to corresponding nav link
          const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
          activeLinks.forEach(link => {
            link.classList.add('active');
          });
        }
      });
    }
    
    // Toggle mobile navigation
    function toggleMobileNav() {
      mobileNav.classList.toggle('active');
      hamburgerIcon.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    }
    
    // Close mobile nav when clicking a link
    function closeMobileNav() {
      mobileNav.classList.remove('active');
      hamburgerIcon.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
    
    // Contact form submission handler (placeholder)
    function handleContactSubmit(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Placeholder for form submission
      console.log('Form submitted:', { name, email, subject, message });
      
      // You would typically send this data to a server
      // For this example, we'll just show a success message
      const formElements = contactForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.innerHTML = `
        <p>Thank you for your message, ${name}!</p>
        <p>I'll get back to you as soon as possible.</p>
      `;
      
      // Replace form with success message
      contactForm.innerHTML = '';
      contactForm.appendChild(successMessage);
    }
    
    // Create animation for skill bars
    function animateSkills() {
      const skillLevels = document.querySelectorAll('.skill-level');
      
      // Check if element is in viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      
      // Animate skill bars when they come into view
      function checkSkills() {
        skillLevels.forEach(skill => {
          if (isInViewport(skill)) {
            skill.style.width = skill.style.width || '0%';
            const width = skill.getAttribute('style').split('width: ')[1].split(';')[0] || skill.style.width;
            skill.style.width = '0%';
            setTimeout(() => {
              skill.style.transition = 'width 1s ease-in-out';
              skill.style.width = width;
            }, 200);
          }
        });
      }
      
      // Initial check
      checkSkills();
      
      // Check on scroll
      window.addEventListener('scroll', checkSkills);
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    mobileNavToggle.addEventListener('click', toggleMobileNav);
    navLinks.forEach(link => link.addEventListener('click', closeMobileNav));
    
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Initialize animations
    animateSkills();
    
    // Initial scroll check
    handleScroll();
    
    // Smooth scroll for section links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If link contains .html, it's to another page - allow normal navigation
        if (href.includes('.html')) {
          // Let the default behavior happen (don't call preventDefault)
          return true;
        } 
        // Otherwise it's an internal link, use smooth scroll
        else {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });