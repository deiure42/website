const urlParams = new URLSearchParams(window.location.search);
const fileParam = urlParams.get('file');

if (!fileParam) {
	document.getElementById('article-title').innerText = "Chyba";
	document.getElementById('markdown-body').innerHTML = "<p>Nebyl zadán žádný článek k zobrazení.</p>";
} else {
	let formattedTitle = fileParam.replace(/-/g, ' ');
	formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
	document.getElementById('article-title').innerText = formattedTitle;

	const filePath = `content/${fileParam}.md`;

	fetch(filePath)
		.then(response => {
			if (!response.ok) throw new Error("Soubor nebyl nalezen na cestě: " + filePath);
			return response.text();
		})
		.then(text => {
			const frontmatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);

			if (frontmatterMatch) {
				const yamlText = frontmatterMatch[1];
				const metadata = {};
				
				yamlText.split('\n').forEach(line => {
					const parts = line.split(':');
					if (parts.length >= 2) {
						const key = parts[0].trim();
						const value = parts.slice(1).join(':').trim(); 
						metadata[key] = value;
					}
				});

				if (metadata.bgImage) {
					const bg = metadata.bgImage;
					const isWebUrl = bg.startsWith('http://') || bg.startsWith('https://');
					const bgUrl = isWebUrl ? bg : `images/${bg}`;

					document.body.style.backgroundImage = `url('${bgUrl}')`;
					document.body.style.backgroundSize = 'cover';
					document.body.style.backgroundPosition = 'center';
					document.body.style.backgroundAttachment = 'fixed';
				}
				
				if (metadata.accentColor) {
					document.body.style.setProperty('--accent', metadata.accentColor);
				}

				text = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
			}

			text = text.replace(/ \^([a-zA-Z0-9-]+)(?=\n|$)/gm, '<span id="^$1"></span>');

			text = text.replace(/\!\[\[(.*?)\]\]/g, (match, p1) => {
				const parts = p1.split('|');
				const fileName = parts[0].trim();
				const altText = parts[1] ? parts[1].trim() : fileName;

				const isWebUrl = fileName.startsWith('http://') || fileName.startsWith('https://');
				const src = isWebUrl ? fileName : `images/${fileName}`;

				return `<img src="${src}" alt="${altText}" class="obsidian-image">`;
			});

			text = text.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
				const parts = p1.split('|');
				const linkTarget = parts[0].trim();
				const alias = parts[1] ? parts[1].trim() : linkTarget;
				
				let file = '';
				let hash = '';
				
				if (linkTarget.includes('#')) {
					const hashParts = linkTarget.split('#');
					file = hashParts[0].trim();
					hash = hashParts[1].trim();
				} else {
					file = linkTarget;
				}

				let targetId = '';
				if(hash){
					if(hash.startsWith('^')){
						targetId = hash;
					}else{
						targetId = hash.toLowerCase().replace(/[^\w\sáčďéěíňóřšťúůýž]/gi, '').replace(/\s+/g, '-');
					}
				}

				const urlParams = new URLSearchParams(window.location.search);
				const currentFile = urlParams.get('file');
				
				let href = '';
				
				if (!file || file === currentFile) {
					href = targetId ? `#${targetId}` : '#';
				} else {
					href = `markdown-viewer.html?file=${encodeURIComponent(file)}`;
					if (targetId) href += `#${targetId}`;
				}
				
				return `<a href="${href}" class="internal-link">${alias}</a>`;
			});

			text = text.replace(/^\[\^([^\]]+)\]:\s*(.*)$/gm, '<div id="fn-$1" class="footnote-def"><a href="#fnref-$1" class="footnote-backref" title="Zpět na text">↩</a> <span class="footnote-text"><strong>$1:</strong> $2</span></div>');
			text = text.replace(/\[\^([^\]]+)\](?!:)/g, '<sup id="fnref-$1"><a href="#fn-$1" class="footnote-ref">[$1]</a></sup>');

			document.getElementById('markdown-body').innerHTML = marked.parse(text);

			const headings = document.querySelectorAll('#markdown-body h1, #markdown-body h2, #markdown-body h3, #markdown-body h4, #markdown-body h5, #markdown-body h6');
			headings.forEach(heading => {
				if (!heading.id) {
					heading.id = heading.innerText.toLowerCase().replace(/[^\w\sáčďéěíňóřšťúůýž]/gi, '').replace(/\s+/g, '-');
				}
			});

			setTimeout(() => {
				if (window.location.hash) {
					const id = decodeURIComponent(window.location.hash.substring(1)); 
					const targetElement = document.getElementById(id);
					
					if (targetElement) {
						targetElement.scrollIntoView({ behavior: 'smooth' });
					}
				}
			}, 150);

			const blockquotes = document.querySelectorAll('#markdown-body blockquote');
			blockquotes.forEach(bq => {
				const firstP = bq.querySelector('p');
				if (!firstP) return;
				
				const textContent = firstP.innerHTML;
				const match = textContent.match(/^\[!(\w+)\](.*?)(\n|<br>|$)/);
				
				if (match) {
					const type = match[1].toLowerCase();
					const title = match[2].trim() || type.charAt(0).toUpperCase() + type.slice(1);
					
					bq.classList.add('callout', `callout-${type}`);
					
					firstP.innerHTML = textContent.replace(/^\[!\w+\].*?(\n|<br>|$)/, '');
					
					const titleEl = document.createElement('div');
					titleEl.className = 'callout-title';
					titleEl.innerText = title;
					
					bq.insertBefore(titleEl, bq.firstChild);
				}
			});

			const preElements = document.querySelectorAll('#markdown-body pre');
			preElements.forEach(pre => {
				const codeEl = pre.querySelector('code');
				if (!codeEl) return;

				let lang = 'kód'; 
				const langClass = Array.from(codeEl.classList).find(c => c.startsWith('language-'));
				if (langClass) {
					lang = langClass.replace('language-', '');
				}

				const wrapper = document.createElement('div');
				wrapper.className = 'code-block-wrapper';
				
				pre.parentNode.insertBefore(wrapper, pre);
				wrapper.appendChild(pre);

				const copyBtn = document.createElement('button');
				copyBtn.className = 'copy-code-btn';
				copyBtn.innerText = lang;
				copyBtn.title = 'Kopírovat do schránky';
				
				copyBtn.addEventListener('click', () => {
					navigator.clipboard.writeText(codeEl.innerText).then(() => {
						const originalText = copyBtn.innerText;
						copyBtn.innerText = 'Zkopírováno!';
						copyBtn.classList.add('copied');
						
						setTimeout(() => {
							copyBtn.innerText = originalText;
							copyBtn.classList.remove('copied');
						}, 2000);
					}).catch(err => {
						console.error('Nepodařilo se zkopírovat text: ', err);
					});
				});

				wrapper.appendChild(copyBtn);
			});

			function renderMath() {
				if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
					MathJax.typesetPromise([document.getElementById('markdown-body')]).catch(function (err) {
						console.error('Chyba při renderování matematiky: ', err.message);
					});
				} else {
					setTimeout(renderMath, 50);
				}
			}
			
			renderMath();
		})
	.catch(error => {
		document.getElementById('markdown-body').innerHTML = `<p style="color: red;">${error.message}</p>`;
	});
}
