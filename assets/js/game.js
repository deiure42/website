/* ==========================================================================
   1. GLOBÁLNÍ STAV PRO HRY A INICIALIZACE (Nyní bezpečně nahoře)
   ========================================================================== */
window.GameInput = {
    keys: {},       // Ukládá true/false pro úplně všechny klávesy
    isPaused: false // Globální stav pauzy pro hry
};

// Funkce, kterou zavolá samotná hra (např. tetris.js), aby si nastavila prostředí
window.GameInput.initGame = function(config) {
    // 1. Změna titulku stránky a nadpisu
    document.title = `Moje Hry | ${config.title}`;
    const titleElement = document.querySelector('.game-description h2');
    const descElement = document.querySelector('.game-description p');
    
    if (titleElement) titleElement.textContent = config.title;
    if (descElement) descElement.innerHTML = config.description;

    // 2. Aktivace specifických kláves
    document.querySelectorAll('.kbd-key').forEach(key => {
        key.classList.remove('key-active');
        key.classList.add('key-pressed');
    });

    if (config.activeKeys && Array.isArray(config.activeKeys)) {
        config.activeKeys.forEach(keyCode => {
            const vKey = document.querySelector(`.kbd-key[data-key="${keyCode}"]`);
            if (vKey) {
                vKey.classList.remove('key-pressed');
                vKey.classList.add('key-active');
            }
        });
    }
};

/* ==========================================================================
   POČKÁME NA NAČTENÍ HTML, AŽ POTÉ ŘEŠÍME TLAČÍTKA A URL
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       2. OVLÁDACÍ TLAČÍTKA KONZOLE
       ========================================================================== */
    const btnPause = document.getElementById('btn-pause');
    const btnReload = document.getElementById('btn-reload');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const gameCanvas = document.getElementById('game-canvas');

    if (btnFullscreen && gameCanvas) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                gameCanvas.requestFullscreen().catch(err => {
                    console.log(`Chyba při spouštění fullscreenu: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }

    if (btnReload) {
        btnReload.addEventListener('click', () => {
            window.location.reload();
        });
    }

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            window.GameInput.isPaused = !window.GameInput.isPaused;
            btnPause.textContent = window.GameInput.isPaused ? '▶️' : '⏸️';
            btnPause.title = window.GameInput.isPaused ? 'Pokračovat' : 'Pozastavit';
        });
    }

    /* ==========================================================================
       3. UNIVERZÁLNÍ LOGIKA PRO CELOU KLÁVESNICI
       ========================================================================== */
    const virtualKeys = document.querySelectorAll('.kbd-key');

    function handleKeyDown(keyCode) {
        window.GameInput.keys[keyCode] = true;
        const vKey = document.querySelector(`.kbd-key[data-key="${keyCode}"]`);
        if (vKey && vKey.classList.contains('key-active')) {
            vKey.classList.add('is-down');
        }
    }

    function handleKeyUp(keyCode) {
        window.GameInput.keys[keyCode] = false;
        const vKey = document.querySelector(`.kbd-key[data-key="${keyCode}"]`);
        if (vKey) {
            vKey.classList.remove('is-down');
        }
    }

    const keysToBlock = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    window.addEventListener('keydown', (e) => {
        if (keysToBlock.includes(e.code)) {
            e.preventDefault();
        }
        if (!e.repeat) {
            handleKeyDown(e.code);
        }
    });

    window.addEventListener('keyup', (e) => {
        handleKeyUp(e.code);
    });

    virtualKeys.forEach(vKey => {
        if (vKey.classList.contains('key-active')) {
            const keyCode = vKey.getAttribute('data-key');
            vKey.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                handleKeyDown(keyCode);
            });
            vKey.addEventListener('pointerup', () => handleKeyUp(keyCode));
            vKey.addEventListener('pointerleave', () => handleKeyUp(keyCode));
            vKey.addEventListener('pointercancel', () => handleKeyUp(keyCode));
        }
    });

    /* ==========================================================================
       4. DYNAMICKÉ NAČÍTÁNÍ HRY Z URL
       ========================================================================== */
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');

    if (gameId) {
        const script = document.createElement('script');
        script.src = `assets/js/${gameId}.js`;
        script.defer = true;
        
        script.onerror = () => {
            document.querySelector('.game-description h2').textContent = "Hra nenalezena";
            document.querySelector('.game-description p').textContent = `Skript pro hru "${gameId}" se nepodařilo načíst.`;
        };

        document.body.appendChild(script);
    } else {
        const titleElement = document.querySelector('.game-description h2');
        if (titleElement) titleElement.textContent = "Žádná hra nebyla vybrána";
    }
});
