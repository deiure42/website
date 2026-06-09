(function () {
	if (window.GameInput && window.GameInput.initGame) {
		window.GameInput.initGame({
			title: "Tetris",
			description: "Klasický Tetris s možností odložení kostky.<br><br><strong>Pohyb:</strong> Šipky nebo W, A, S, D<br><strong>Dvojitý skok:</strong> J, K<br><strong>Rotace:</strong> Šipka nahoru / W<br><strong>Hard Drop:</strong> Mezerník / S / Šipka dolů<br><strong>Schovat kostku (Hold):</strong> C<br><strong>Návrat do menu:</strong> Q",
			
			// Vypsání kláves, které se na papírové konzoli rozsvítí a půjde na ně klikat myší
			activeKeys: [
				"KeyQ", "KeyW", "KeyA", "KeyS", "KeyD", "KeyC", "KeyJ", "KeyK", 
				"ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Space"
			]
		});
	}

	const canvas = document.getElementById('game-canvas');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');

	const WIDTH = 10;
	const HEIGHT = 30;
	const QUEUE_SIZE = 4;
	const INITIAL_DELAY = 250;
	const MIN_DELAY = 50;
	const DELAY_REDUCTION = 150;
	const PLACEMENT_DELAY = 10;

	// Rozměry pro vykreslování v terminálovém stylu na Canvas (800x450)
	const BLOCK_SIZE = 13;      // Velikost kostičky v pixelech
	const OFFSET_Y = 30;        // Vertikální odsazení herního pole
	const BOARD_X = 280;        // Horizontální vycentrování pole na plátně

	// Stavy hry
	const STATE_MENU = 'MENU';
	const STATE_PLAYING = 'PLAYING';
	const STATE_GAMEOVER = 'GAMEOVER';
	const STATE_SAVE_SCORE = 'SAVE_SCORE';

	let gameState = STATE_MENU;
	let board = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));
	let score = 0;
	let delay = INITIAL_DELAY;
	let k = 0; // placement delay čítač
	
	let nextTetrominoes = [];
	let storedTetromino = -1;
	let handTetromino = -1;
	let canSwap = true;

	let currentX = Math.floor(WIDTH / 2) - 1;
	let currentY = 0;
	let currentTetromino = Array.from({ length: 4 }, () => Array(4).fill(0));
	let currentColor = '';

	// Menu a Game Over navigace
	let menuChoice = 0;
	let gameOverChoice = 0;
	let inputName = "";

	// Časovače
	let stepTim = Date.now();
	let refreshTim = Date.now();

	// Sledování hran tisků pro menu/ovládání
	let lastKeysState = {};

	// Definice tvarů (7 kusů, 4x4 matice)
	const TETROMINOES = [
		[[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]], // I
		[[0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0]], // O
		[[0,0,0,0], [0,1,0,0], [1,1,1,0], [0,0,0,0]], // T
		[[0,0,0,0], [1,0,0,0], [1,1,1,0], [0,0,0,0]], // J
		[[0,0,0,0], [0,0,1,0], [1,1,1,0], [0,0,0,0]], // L
		[[0,0,0,0], [1,1,0,0], [0,1,1,0], [0,0,0,0]], // S
		[[0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0]]  // Z
	];

	const TETROMINO_COLORS = [
		'#00FFFF', // Cyan
		'#FFFF00', // Yellow
		'#FF00FF', // Magenta
		'#0000FF', // Blue
		'#FFFFFF', // White
		'#00FF00', // Green
		'#FF0000'  // Red
	];

	function copyTetromino(index) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				currentTetromino[i][j] = TETROMINOES[index][i][j];
			}
		}
		currentColor = TETROMINO_COLORS[index];
	}

	function checkCollision(dx, dy, matrix = currentTetromino) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (matrix[i][j]) {
					let newX = currentX + j + dx;
					let newY = currentY + i + dy;
					if (newX < 0 || newX >= WIDTH || newY < 0 || newY >= HEIGHT) return true;
					if (board[newY][newX]) return true;
				}
			}
		}
		return false;
	}

	function generateTetromino() {
		let index = nextTetrominoes[0];
		handTetromino = index;
		copyTetromino(index);
		currentX = Math.floor(WIDTH / 2) - 1;
		currentY = 0;

		for (let i = 0; i < QUEUE_SIZE - 1; i++) {
			nextTetrominoes[i] = nextTobaccoes = nextTetrominoes[i + 1];
		}
		nextTetrominoes[QUEUE_SIZE - 1] = Math.floor(Math.random() * 7);

		if (checkCollision(0, 0)) {
			gameState = STATE_GAMEOVER;
			gameOverChoice = 0;
		}
	}

	function clearLines() {
		for (let y = HEIGHT - 1; y >= 0; y--) {
			let full = true;
			for (let x = 0; x < WIDTH; x++) {
				if (!board[y][x]) {
					full = false;
					break;
				}
			}
			if (full) {
				for (let i = y; i > 0; i--) {
					board[i] = [...board[i - 1]];
				}
				board[0] = Array(WIDTH).fill(0);
				score += 30;
				y++; // Zkontroluj stejný řádek znova po posunu
			}
		}
	}

	function placeTetromino() {
		if (k < PLACEMENT_DELAY) {
			k++;
			return;
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (currentTetromino[i][j]) {
					board[currentY + i][currentX + j] = currentColor;
				}
			}
		}
		k = 0;
		score += 2;
		clearLines();
		canSwap = true;
		generateTetromino();
	}

	function rotateTetromino() {
		let temp = Array.from({ length: 4 }, () => Array(4).fill(0));
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				temp[j][3 - i] = currentTetromino[i][j];
			}
		}

		if (!checkCollision(0, 0, temp)) {
			currentTetromino = temp;
			return;
		}

		for (let dy = 0; dy <= 4; dy++) {
			for (let dx = 0; dx <= 4; dx++) {
				if (!checkCollision(dx, dy, temp)) {
					currentX += dx; currentY += dy;
					currentTetromino = temp; return;
				}
				if (!checkCollision(-dx, -dy, temp)) {
					currentX -= dx; currentY -= dy;
					currentTetromino = temp; return;
				}
			}
		}
	}

	function swapTetromino() {
		if (!canSwap) return;
		k = 0;
		if (storedTetromino === -1) {
			storedTetromino = handTetromino;
			generateTetromino();
		} else {
			let temp = storedTetromino;
			storedTetromino = handTetromino;
			copyTetromino(temp);
			currentX = Math.floor(WIDTH / 2) - 1;
			currentY = 0;
		}
		canSwap = false;
	}

	function getScores() {
		let scores = localStorage.getItem('tetris_scores');
		return scores ? JSON.parse(scores) : [];
	}

	function saveScoreLocally(name, newScore) {
		let scores = getScores();
		scores.push({ name: name || 'ANONYM', score: newScore });
		scores.sort((a, b) => b.score - a.score);
		scores = scores.slice(0, 10); // Uložit max 10
		localStorage.setItem('tetris_scores', JSON.stringify(scores));
	}

	function drawText(text, x, y, color = '#FFFFFF', align = 'left') {
		ctx.fillStyle = color;
		ctx.font = '15px "Courier New", Courier, monospace';
		ctx.textAlign = align;
		ctx.fillText(text, x, y);
	}

	function drawScreen() {
		// Vyčištění černé obrazovky
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (gameState === STATE_MENU) {
			drawText("TETRIS THE GAME", canvas.width / 2, 60, '#7852ee', 'center');
			drawText("High Scores:", canvas.width / 2 - 80, 120, '#94a3b8');
			
			let scores = getScores().slice(0, 5);
			for (let i = 0; i < 5; i++) {
				let entry = scores[i] || { name: '-----', score: 0 };
				drawText(`${i + 1}. ${entry.name} - ${entry.score}`, canvas.width / 2 - 80, 150 + i * 25, '#5c6e74');
			}

			drawText((menuChoice === 0 ? "> Start Game" : "  Start Game"), canvas.width / 2, 320, menuChoice === 0 ? '#7852ee' : '#FFFFFF', 'center');
			drawText((menuChoice === 1 ? "> Exit" : "  Exit"), canvas.width / 2, 350, menuChoice === 1 ? '#7852ee' : '#FFFFFF', 'center');
			return;
		}

		if (gameState === STATE_GAMEOVER) {
			drawText("GAME OVER", canvas.width / 2, 60, '#FF0000', 'center');
			drawText(`Final Score: ${score}`, canvas.width / 2, 90, '#FFFF00', 'center');

			drawText("High Scores:", canvas.width / 2 - 80, 140, '#94a3b8');
			let scores = getScores().slice(0, 5);
			for (let i = 0; i < 5; i++) {
				let entry = scores[i] || { name: '-----', score: 0 };
				drawText(`${i + 1}. ${entry.name} - ${entry.score}`, canvas.width / 2 - 80, 170 + i * 25, '#5c6e74');
			}

			drawText((gameOverChoice === 0 ? "> Retry" : "  Retry"), canvas.width / 2, 310, gameOverChoice === 0 ? '#7852ee' : '#FFFFFF', 'center');
			drawText((gameOverChoice === 1 ? "> Save score" : "  Save score"), canvas.width / 2, 340, gameOverChoice === 1 ? '#7852ee' : '#FFFFFF', 'center');
			drawText((gameOverChoice === 2 ? "> Exit" : "  Exit"), canvas.width / 2, 370, gameOverChoice === 2 ? '#7852ee' : '#FFFFFF', 'center');
			return;
		}

		if (gameState === STATE_SAVE_SCORE) {
			drawText("SAVE YOUR SCORE", canvas.width / 2, 100, '#7852ee', 'center');
			drawText("Enter your name:", canvas.width / 2, 160, '#FFFFFF', 'center');
			// Blikající kurzor pod jménem
			let cursor = (Math.floor(Date.now() / 500) % 2 === 0) ? "_" : "";
			drawText(inputName + cursor, canvas.width / 2, 200, '#FFFF00', 'center');
			drawText("Press ENTER to save", canvas.width / 2, 280, '#5c6e74', 'center');
			return;
		}

		if (gameState === STATE_PLAYING) {
			// 1. Vykreslení herního pole (Board)
			ctx.strokeStyle = '#3d4e66';
			ctx.strokeRect(BOARD_X - 2, OFFSET_Y - 2, WIDTH * BLOCK_SIZE + 4, HEIGHT * BLOCK_SIZE + 4);

			for (let y = 0; y < HEIGHT; y++) {
				for (let x = 0; x < WIDTH; x++) {
					let rx = BOARD_X + x * BLOCK_SIZE;
					let ry = OFFSET_Y + y * BLOCK_SIZE;
					if (board[y][x]) {
						ctx.fillStyle = board[y][x];
						ctx.fillRect(rx, ry, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
					} else {
						ctx.fillStyle = '#111111';
						ctx.fillRect(rx + BLOCK_SIZE/2 - 1, ry + BLOCK_SIZE/2 - 1, 2, 2);
					}
				}
			}

			// 2. Vykreslení Ghost Piece (Duch kostky)
			let ghostY = currentY;
			while (!checkCollision(0, ghostY - currentY + 1)) ghostY++;
			ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (currentTetromino[i][j]) {
						let rx = BOARD_X + (currentX + j) * BLOCK_SIZE;
						let ry = OFFSET_Y + (ghostY + i) * BLOCK_SIZE;
						ctx.fillRect(rx, ry, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
					}
				}
			}

			// 3. Vykreslení aktivní kostky
			ctx.fillStyle = currentColor;
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (currentTetromino[i][j]) {
						let rx = BOARD_X + (currentX + j) * BLOCK_SIZE;
						let ry = OFFSET_Y + (currentY + i) * BLOCK_SIZE;
						ctx.fillRect(rx, ry, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
					}
				}
			}

			// 4. Vykreslení UI textů okolo pole
			drawText(`Score: ${score}`, BOARD_X, OFFSET_Y + HEIGHT * BLOCK_SIZE + 25, '#FFFFFF');
			drawText(`Place time: ${k}/${PLACEMENT_DELAY}`, BOARD_X, OFFSET_Y + HEIGHT * BLOCK_SIZE + 45, '#5c6e74');
			drawText(`Step time: ${delay}ms`, BOARD_X, OFFSET_Y + HEIGHT * BLOCK_SIZE + 65, '#5c6e74');

			// Stored Piece (Vlevo)
			drawText("Stored:", BOARD_X - 100, OFFSET_Y + 10, '#94a3b8');
			if (storedTetromino !== -1) {
				ctx.fillStyle = TETROMINO_COLORS[storedTetromino];
				let matrix = TETROMINOES[storedTetromino];
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j++) {
						if (matrix[i][j]) {
							ctx.fillRect(BOARD_X - 100 + j * BLOCK_SIZE, OFFSET_Y + 30 + i * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
						}
					}
				}
			}

			// Next Queue (Vpravo)
			drawText("Next:", BOARD_X + WIDTH * BLOCK_SIZE + 40, OFFSET_Y + 10, '#94a3b8');
			for (let n = 0; n < QUEUE_SIZE; n++) {
				let idx = nextTetrominoes[n];
				if (idx !== undefined) {
					ctx.fillStyle = TETROMINO_COLORS[idx];
					let matrix = TETROMINOES[idx];
					for (let i = 0; i < 4; i++) {
						for (let j = 0; j < 4; j++) {
							if (matrix[i][j]) {
								ctx.fillRect(BOARD_X + WIDTH * BLOCK_SIZE + 40 + j * BLOCK_SIZE, OFFSET_Y + 30 + n * 55 + i * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
							}
						}
					}
				}
			}

			// Pokud stiskneme tlačítko Pauza na konzoli
			if (window.GameInput && window.GameInput.isPaused) {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				drawText("PAUZA", canvas.width / 2, canvas.height / 2, '#7852ee', 'center');
			}
		}
	}

	function initGame() {
		board = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0));
		score = 0;
		delay = INITIAL_DELAY;
		storedTetromino = -1;
		canSwap = true;
		k = 0;
		
		nextTetrominoes = [];
		for (let i = 0; i < QUEUE_SIZE; i++) {
			nextTetrominoes.push(Math.floor(Math.random() * 7));
		}
		generateTetromino();
	}

	function isJustPressed(code) {
		let isDown = window.GameInput && window.GameInput.keys[code];
		let wasDown = lastKeysState[code];
		lastKeysState[code] = isDown;
		return isDown && !wasDown;
	}

	function gameLoop() {
		// Kontrola, zda nedošlo ke globální pauze přes horní tlačítko
		const isPaused = window.GameInput && window.GameInput.isPaused;

		// A) Zpracování vstupu na základě stavů hry
		if (!isPaused) {
			if (gameState === STATE_MENU) {
				if (isJustPressed('KeyW') || isJustPressed('ArrowUp')) menuChoice = menuChoice === 0 ? 1 : 0;
				if (isJustPressed('KeyS') || isJustPressed('ArrowDown')) menuChoice = menuChoice === 1 ? 0 : 1;
				if (isJustPressed('Enter') || isJustPressed('Space')) {
					if (menuChoice === 0) {
						initGame();
						gameState = STATE_PLAYING;
					} else {
						window.location.href = 'index.html'; // Odchod z hry
					}
				}
			} 
			else if (gameState === STATE_GAMEOVER) {
				if (isJustPressed('KeyW') || isJustPressed('ArrowUp')) gameOverChoice = gameOverChoice <= 0 ? 2 : gameOverChoice - 1;
				if (isJustPressed('KeyS') || isJustPressed('ArrowDown')) gameOverChoice = gameOverChoice >= 2 ? 0 : gameOverChoice + 1;
				if (isJustPressed('Enter') || isJustPressed('Space')) {
					if (gameOverChoice === 0) {
						initGame();
						gameState = STATE_PLAYING;
					} else if (gameOverChoice === 1) {
						inputName = "";
						gameState = STATE_SAVE_SCORE;
					} else {
						window.location.href = 'index.html';
					}
				}
			}
			else if (gameState === STATE_SAVE_SCORE) {
				// Odchytávání psaní jména
				if (isJustPressed('Enter') && inputName.trim().length > 0) {
					saveScoreLocally(inputName.toUpperCase(), score);
					gameState = STATE_GAMEOVER;
					gameOverChoice = 0;
				}
				// Backspace pro mazání znaků
				if (isJustPressed('Backspace') || window.GameInput.keys['Backspace']) {
					if (isJustPressed('Backspace') && inputName.length > 0) {
						inputName = inputName.slice(0, -1);
					}
				}
				// Čtení běžných kláves A-Z pro zápis jména
				for (let charCode = 65; charCode <= 90; charCode++) {
					let code = `Key${String.fromCharCode(charCode)}`;
					if (isJustPressed(code) && inputName.length < 15) {
						inputName += String.fromCharCode(charCode);
					}
				}
			}
			else if (gameState === STATE_PLAYING) {
				// Ovládací prvky Tetrisu
				if (isJustPressed('KeyQ')) gameState = STATE_MENU;
				
				// Pohyby do stran a dvojité skoky (J / K)
				if ((isJustPressed('KeyA') || isJustPressed('ArrowLeft')) && !checkCollision(-1, 0)) currentX--;
				if (isJustPressed('KeyJ') && !checkCollision(-2, 0)) currentX -= 2;
				if ((isJustPressed('KeyD') || isJustPressed('ArrowRight')) && !checkCollision(1, 0)) currentX++;
				if (isJustPressed('KeyK') && !checkCollision(2, 0)) currentX += 2;
				
				// Rotace a Hold
				if (isJustPressed('KeyW') || isJustPressed('ArrowUp')) rotateTetromino();
				if (isJustPressed('KeyC')) swapTetromino();

				// Hard Drop / Zrychlení pádu (S / Space / Down / Enter)
				if (isJustPressed('KeyS') || isJustPressed('Space') || isJustPressed('ArrowDown') || isJustPressed('Enter')) {
					while (!checkCollision(0, 1)) currentY++;
					k = PLACEMENT_DELAY;
					placeTetromino();
					
					let dropDistance = 0;
					while (!checkCollision(0, dropDistance + 1)) dropDistance++;
					score += Math.floor(dropDistance / 2);
				}

				// Fyzikální krok gravitace (Step timer)
				if (Date.now() - stepTim >= delay) {
					if (!checkCollision(0, 1)) {
						currentY++;
					} else {
						placeTetromino();
					}

					// Dynamický delay podle dosaženého skóre
					let difficultyStage = Math.floor(score / 300);
					delay = INITIAL_DELAY * Math.pow(0.9, difficultyStage);
					if (delay < MIN_DELAY) delay = MIN_DELAY;
					
					stepTim = Date.now();
				}
			}
		}

		// B) Překreslení plátna
		if (Date.now() - refreshTim >= 50) {
			drawScreen();
			refreshTim = Date.now();
		}

		// Udržení smyčky naživu
		requestAnimationFrame(gameLoop);
	}

	// Nastartování cyklu
	requestAnimationFrame(gameLoop);
})();
