

// Function to highlight the current page
function highlightCurrentPage() {
    // Select all nav links (desktop and mobile)
    const navLinks = document.querySelectorAll("nav a");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
  
    navLinks.forEach((link) => {
      // Get the href attribute (e.g., "about.html")
      const linkPath = link.getAttribute("href");
      // Add 'active' class if the link matches the current page
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  
    console.log("Nav links found:", navLinks.length);
  }

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
     // Include header
     fetch("header.html")
     .then((response) => response.text())
     .then((data) => {
       document.getElementById("header").innerHTML = data;
       // Highlight current page after header is loaded
       highlightCurrentPage();
     })
     .catch((error) => console.error("Error loading header:", error));
 
   // Include footer
   fetch("footer.html")
     .then((response) => response.text())
     .then((data) => {
       document.getElementById("footer").innerHTML = data;
     })
     .catch((error) => console.error("Error loading footer:", error));

    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile navigation toggle
    if (window.innerWidth < 768) {
        const navElement = document.querySelector('nav');
        const navContainer = document.createElement('div');
        navContainer.classList.add('nav-container');
        
        const navToggle = document.createElement('button');
        navToggle.classList.add('nav-toggle');
        navToggle.innerHTML = '☰';
        navToggle.setAttribute('aria-label', 'Toggle Navigation');
        
        const navList = document.querySelector('nav ul');
        navList.style.display = 'none';
        
        navContainer.appendChild(navToggle);
        navElement.insertBefore(navContainer, navList);
        
        navToggle.addEventListener('click', function() {
            if (navList.style.display === 'none') {
                navList.style.display = 'flex';
                navList.style.flexDirection = 'column';
                navToggle.innerHTML = '✕';
            } else {
                navList.style.display = 'none';
                navToggle.innerHTML = '☰';
            }
        });
    }
    
    // Image lightbox effect for tournament photos
    const tournamentLinks = document.querySelectorAll('.tournament-table a');
    tournamentLinks.forEach(link => {
        if (link.textContent.toLowerCase().includes('photos')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    
});

// Function for adding new tournament entries (for admin use)
function addTournamentEntry(formData) {
    // This is a template function that would be expanded
    // based on how Adam wants to update the site
    const tournamentName = formData.tournamentName;
    const tournamentDate = formData.tournamentDate;
    const photosLink = formData.photosLink;
    const videosLink = formData.videosLink;
    
    // This would be where the actual functionality to update the page would go
    // In a real implementation, this would likely use an API or backend service
    console.log(`New tournament added: ${tournamentName} on ${tournamentDate}`);
    
    // Return success message
    return {
        success: true,
        message: `Added ${tournamentName} to the tournament list`
    };
}

// Simple form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    let isValid = true;
    
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}