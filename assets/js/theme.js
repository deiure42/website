const themeToggle = document.getElementById('themeToggle');

function applyTheme(isDark){
	if(isDark){
		document.body.classList.add('dark-mode');
		themeToggle.innerText = '☀️';
	}else{
		document.body.classList.remove('dark-mode');
		themeToggle.innerText = '🌙';
	}
}

const savedTheme = localStorage.getItem('obsidian-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(savedTheme === 'dark'){
	applyTheme(true);
}else if(savedTheme === 'light'){
	applyTheme(false);
}else{
	applyTheme(systemPrefersDark);
}

themeToggle.addEventListener('click', () => {
	const isCurrentlyDark = document.body.classList.contains('dark-mode');
	
	applyTheme(!isCurrentlyDark);
	
	localStorage.setItem('obsidian-theme', !isCurrentlyDark ? 'dark' : 'light');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
	if(!localStorage.getItem('obsidian-theme')){
		applyTheme(e.matches);
	}
});
