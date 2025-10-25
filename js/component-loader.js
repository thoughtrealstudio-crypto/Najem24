// Plik: js/component-loader.js
function initializeScripts() {
    console.log("Komponenty załadowane, inicjalizuję skrypty.");
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Dodajemy klasę .active-link do nawigacji
    const currentPage = window.location.pathname.split("/").pop();
    if(currentPage === "" || currentPage === "index.html") {
         // Strona główna nie ma linku do samej siebie, więc nic nie robimy
    } else {
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active-link');
            }
        });
    }
}

const loadComponent = (url, placeholderId) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Nie można załadować ${url}`);
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
            } else {
                console.warn(`Nie znaleziono kontenera o ID: ${placeholderId}`);
            }
        });
};

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ])
    .then(initializeScripts)
    .catch(error => {
        console.error("Wystąpił błąd podczas ładowania komponentu:", error);
    });
});
