document.addEventListener('DOMContentLoaded', () => {
    // Najdeme všechny prvky, které chceme animovat
    const animatedElements = document.querySelectorAll('.fade-in-element');

    // Nastavení pozorovatele
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Pokud element aspoň z 15 % vstoupí do obrazovky
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Pokud chceme animovat jen jednou a pak už ne, můžeme ho přestat sledovat:
                // observer.unobserve(entry.target);
            } else {
                // (Volitelné) Pokud chceš, aby element znovu zmizel, když odskroluješ pryč:
                entry.target.classList.remove('show'); 
            }
        });
    }, {
        // Spustí se, když je vidět alespoň 15 % elementu
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Mírný posun, aby to nezačalo hned na okraji
    });

    // Sledovat všechny vybrané prvky
    animatedElements.forEach(el => observer.observe(el));
});
