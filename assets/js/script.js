let imagePanel = document.querySelector('.image-panel');
let playerName = document.querySelector('.player-name');
let playerClub = document.querySelector('.player-club');
let playerImg = document.querySelector('.image-panel img');
let playing = false;
let errosJ1 = 0;
let errosJ2 = 0;
let perdeu = 'BURRINHO';
let typedLetter = document.querySelector('.type-text input');
let startGame = document.querySelector('#start');
let showWord = document.querySelector('.show-words');
let done = document.querySelector('#done');
let player1Square = document.querySelectorAll('.player1 .little-square');
let player2Square = document.querySelectorAll('.player2 .little-square');

function playFunction(){
	if(player1.classList.contains('pulse')){
			if(typedLetter.value !== ''){
				showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
				player1.classList.remove('pulse');
				player2.classList.add('pulse');
				typedLetter.value = '';
			}else{
				alert('O jogador 1 precisa digitar alguma letra');
			}
	}else if(player2.classList.contains('pulse')){
		if(typedLetter.value !== ''){
			showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
			player2.classList.remove('pulse');
			player1.classList.add('pulse');
			typedLetter.value = '';
		}else{
			alert('O jogador 2 precisa digitar alguma letra');
		}
	}
			typedLetter.focus();
		}
		function interroga1(){
			let searchResultInt1 = jogadores.findIndex((item)=>{
				if(item.nome == showWord.innerHTML.toLowerCase() || 
					item.sobrenome == showWord.innerHTML.toLowerCase()){
					return true;
				}else{
						return false;
				}
			});
			if(searchResultInt1 > -1){
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
				let audio = new Audio('assets/audio/applause3.mp3');
				audio.play();
				imagePanel.style.display = 'flex';
				playerName.innerHTML = `Nome: ${jogadores[searchResultInt1].nome} ${jogadores[searchResultInt1].sobrenome}`;
				playerClub.innerHTML = `Clube: ${jogadores[searchResultInt1].clube}`;
				if(jogadores[searchResultInt1].img !== undefined){
					playerImg.src = jogadores[searchResultInt1].img;
				}else{
					playerImg.src = 'assets/images/anonimo.jpg';
				}
				jogadores.splice(searchResultInt1,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player2Square[errosJ2].innerHTML = perdeu[errosJ2];
				errosJ2++;
			}
			showWord.innerHTML = '';
		}
		function interroga2(){
			let searchResultInt2 = jogadores.findIndex((item)=>{
				if(item.nome == showWord.innerHTML.toLowerCase() || 
					item.sobrenome == showWord.innerHTML.toLowerCase()){
					return true;
				}else{
						return false;
				}
			});
			if(searchResultInt2 > -1){
			player2Square[errosJ2].innerHTML = perdeu[errosJ2];
			errosJ2++;
			let audio = new Audio('assets/audio/applause3.mp3');
			audio.play();
			imagePanel.style.display = 'flex';
			playerName.innerHTML = `Nome: ${jogadores[searchResultInt2].nome} ${jogadores[searchResultInt2].sobrenome}`;
			playerClub.innerHTML = `Clube: ${jogadores[searchResultInt2].clube}`;
			if(jogadores[searchResultInt2].img !== undefined){
				playerImg.src = jogadores[searchResultInt2].img;
			}else{
				playerImg.src = 'assets/images/anonimo.jpg';
			}
				jogadores.splice(searchResultInt2,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
			}
			showWord.innerHTML = '';
		}

				function finish(){
						if(showWord.innerHTML !== '' && player1.classList.contains('pulse')){
								let searchResult = jogadores.findIndex((item)=>{
									if(item.nome == showWord.innerHTML.toLowerCase() || 
										item.sobrenome == showWord.innerHTML.toLowerCase()){
										return true;
									}else{
											return false;
									}
								});
									if(searchResult > -1){
										let audio = new Audio('assets/audio/applause3.mp3');
										audio.play();
										imagePanel.style.display = 'flex';
										playerName.innerHTML = `Nome: ${jogadores[searchResult].nome} ${jogadores[searchResult].sobrenome}`;
										playerClub.innerHTML = `Clube: ${jogadores[searchResult].clube}`;
										if(jogadores[searchResult].img !== undefined){
											playerImg.src = jogadores[searchResult].img;
										}else{
											playerImg.src = 'assets/images/anonimo.jpg';
										}
										jogadores.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player1Square[errosJ1].innerHTML = perdeu[errosJ1];
										errosJ1++;
									}
								}else if(showWord.innerHTML !== '' && player2.classList.contains('pulse')){
									let searchResult = jogadores.findIndex((item)=>{
										if(item.nome == showWord.innerHTML.toLowerCase() || 
											item.sobrenome == showWord.innerHTML.toLowerCase()){
											return true;
										}else{
											return false;
										}
									});
										if(searchResult > -1){
											let audio = new Audio('assets/audio/applause3.mp3');
											audio.play();
											imagePanel.style.display = 'flex';
											playerName.innerHTML = `Nome: ${jogadores[searchResult].nome} ${jogadores[searchResult].sobrenome}`;
											playerClub.innerHTML = `Clube: ${jogadores[searchResult].clube}`;
											if(jogadores[searchResult].img !== undefined){
											playerImg.src = jogadores[searchResult].img;
										}else{
												playerImg.src = 'assets/images/anonimo.jpg';
										}

											jogadores.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player2Square[errosJ2].innerHTML = perdeu[errosJ2];
										errosJ2++;
									}
								}else{
									//Colocar um audio de aviso
									alert('Jogador 1 ou  jogador 2 não preencheu nenhuma letra!');
								}
								showWord.innerHTML = '';
						}

startGame.addEventListener('click',()=>{
	playing = true;
	let category = document.querySelector('#category');
	let play = document.querySelector('#play');
	let catValue = category.options[category.selectedIndex].value;
	let mode = document.querySelector('#mode');
	let modeValue = mode.options[mode.selectedIndex].value; 
	switch(catValue){
		case 'cantor':
			switch(modeValue){
				case 'amigo':
				//caso de amigo
					alert(`${catValue} ${modeValue}`);
				break;
				case 'computador':
				//caso de pc
					alert(`${catValue} ${modeValue}`);
				break;
			}
		break;
		case 'jogador':
			switch(modeValue){
				case 'amigo':
				//regras para amigo
				let player1 = document.querySelector('#player1');
				let player2 = document.querySelector('#player2');
				let interrogaJ1 = document.querySelector('#question-mark-j1');
				let interrogaJ2 = document.querySelector('#question-mark-j2');
				if(playing){
					let playerStart = Math.floor(Math.random() * 2);
					if(playerStart == '0'){
						if(player2.classList.contains('pulse')){
							player2.classList.remove('pulse');
						}
						player1.classList.add('pulse');
					}else if(playerStart == '1'){
						if(player1.classList.contains('pulse')){
							player1.classList.remove('pulse');
						}
						player2.classList.add('pulse');
					}
					play.addEventListener('click', playFunction);
					interrogaJ1.addEventListener('click',()=>{
						if(player1.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga1();
							}else{
								//efeitos sonoro para aviso
								alert('Formem o nome de um jogador primero!');
							}
							typedLetter.focus();
						}else{
							alert('Não é a sua vez de jogar!');
							typedLetter.focus();
						}
					});
					interrogaJ2.addEventListener('click',()=>{
						if(player2.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga2();
							}else{
								//efeitos sonoro para aviso
								alert('Formem o nome de um jogador primero!');
							}
							typedLetter.focus();
						}else{
							alert('Não é a sua vez de jogar!');
							typedLetter.focus();
						}
					});
					typedLetter.addEventListener('keyup',(e)=>{
						if(e.keyCode == 13){
							playFunction();
						}
					});
					done.addEventListener('click', finish);
					document.addEventListener('keyup',(e)=>{
						if(e.keyCode == 16){
							finish();
						}
					});
				}
				break;
				case 'computador':
				alert('jogando com pc');
					//regras para computador
				break;
			}
		break;
		case 'país':
			switch(modeValue){
					case 'amigo':
					//caso amigo
					alert(`${catValue} ${modeValue}`);
					break;
					case 'computador':
					//caso de pc
					alert(`${catValue} ${modeValue}`);
					break;
			}
		break;
		default:
		alert('Escolha uma categoria válida!');
	}
	typedLetter.focus();
});