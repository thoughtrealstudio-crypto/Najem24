// js/component-loader.js

/**
 * Ta funkcja jest uruchamiana PO załadowaniu wszystkich komponentów.
 * Tutaj umieszczamy skrypty, które muszą "widzieć" elementy z nagłówka lub stopki.
 */
function initializeScripts() {
    console.log("Komponenty załadowane. Uruchamiam skrypty.");

    // 1. Skrypt do dynamicznego roku w stopce
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Skrypt do animacji przy przewijaniu
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
}

/**
 * Funkcja, która pobiera zawartość pliku HTML i wstawia ją do wskazanego kontenera.
 * Zwraca Promise, co pozwala nam czekać na jej zakończenie.
 * @param {string} url - Ścieżka do pliku komponentu (np. 'header.html')
 * @param {string} placeholderId - ID elementu, do którego wstawimy kod (np. 'header-placeholder')
 */
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

/**
 * Główna logika - uruchamiana, gdy DOM jest gotowy.
 * Używamy Promise.all, aby poczekać, aż OBA komponenty (nagłówek i stopka) się załadują.
 * Dopiero po ich załadowaniu uruchamiamy dodatkowe skrypty.
 */
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ])
    .then(() => {
        // Ta część wykona się tylko wtedy, gdy oba komponenty zostaną pomyślnie wczytane.
        initializeScripts();
    })
    .catch(error => {
        console.error("Wystąpił błąd podczas ładowania komponentu:", error);
    });
});
