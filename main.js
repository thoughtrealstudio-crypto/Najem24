// Wait for the entire page to load before running the scripts
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LOAD HEADER AND FOOTER ---
    const loadHTML = (selector, filePath, callback) => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                }
                if (callback) callback(); // Run a callback function after loading
            })
            .catch(error => console.error('Error loading HTML:', error));
    };

    // Load header and then initialize the hamburger menu
    loadHTML('#header-placeholder', 'header.html', initHamburgerMenu);
    // Load footer
    loadHTML('#footer-placeholder', 'footer.html');


    // --- 2. INITIALIZE HAMBURGER MENU LOGIC ---
    // This function is called *after* the header is loaded
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('header nav');

        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                document.body.classList.toggle('nav-open');
            });
        }
    }


    // --- 3. INITIALIZE FAQ ACCORDION LOGIC ---
    // This function runs independently on page load
    function initAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return; // Don't run if no accordion is on the page

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                if (isOpen) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    // Initialize the accordion if it exists on the page
    initAccordion();

});
