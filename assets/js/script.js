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
let instructions = document.querySelector('#instructions');
let pontosJ1 = 0;
let pontosJ2 = 0;
let pontosJ;
if(localStorage.getItem('pointsJ') == null){
	pontosJ = 0;
}else{
	pontosJ = localStorage.getItem('pointsJ');
}
let pontosPc;
if(localStorage.getItem('pointsPc') == null){
	pontosPc = 0;
}else{
	pontosPc = localStorage.getItem('pointsPc');
}
let nomesExcluidos = [];
let deletedNames = document.querySelector('.deletedNames');
let deletedNamesId = document.querySelector('#deletedNames');
let pontuacaoJ1 = document.querySelector('#pontuacaoJ1');
let pontuacaoJ2 = document.querySelector('#pontuacaoJ2');
let player1;
let player2;
let pc;
let player;
let jog;//copia do jogador
let country;//copia dos paises
let time;
let username = 'Jogador2';
if(localStorage.getItem('username') === null){
	let nome_usuario = prompt('digite seu nome, seu nome e sua pontuação serão guardadas!');
	localStorage.setItem('username', nome_usuario);
}else{
	username = localStorage.getItem('username');
}

function jogadoresCopy(){
	jog = jogadores.map((item)=>{
		return item;
	});
	
}
jogadoresCopy();

function paisesCopy(){
	country = paises.map((item)=>{
		return item;
	});
	
}
paisesCopy();

function temporizador(){
	let count = 15;
	let showTime = document.querySelector('.showTime');
	let modeValue = mode.options[mode.selectedIndex].value;
	time = setInterval(()=>{ 
				showTime.innerHTML = count;
				count--;
				if(count < 0){
					clearInterval(time);
					if(modeValue == 'amigo'){
						if(player1.classList.contains('pulse')){
							let audio = new Audio('assets/audio/erro.mp3');
							audio.play();
							imagePanel.style.display = 'none';
							player1Square[errosJ1].innerHTML = perdeu[errosJ1];
							errosJ1++;
							showWord.innerHTML = '';
							player1.classList.remove('pulse');
							player2.classList.add('pulse');
							temporizador();
						}else if(player2.classList.contains('pulse')){
							let audio = new Audio('assets/audio/erro.mp3');
							audio.play();
							imagePanel.style.display = 'none';
							player2Square[errosJ2].innerHTML = perdeu[errosJ2];
							errosJ2++;
							showWord.innerHTML = '';
							player2.classList.remove('pulse');
							player1.classList.add('pulse');
							temporizador();
						}

				if(errosJ2 == 8){
						pontosJ1++;
						alert("Jogador 2 perdeu!");
						pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
						pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
						errosJ1 = 0;
						errosJ2 = 0;
						nomesExcluidos = [];
						deletedNames.innerHTML = '';
						jogadoresCopy();
						paisesCopy();
						for(let i = 0; i < player1Square.length; i++){
							player1Square[i].innerHTML = '';
							player2Square[i].innerHTML = '';
						}
					}else if(errosJ1 == 8){
							pontosJ2++;
							alert("Jogador 1 perdeu!");
							pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
							pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
							errosJ1 = 0;
							errosJ2 = 0;
							nomesExcluidos = [];
							deletedNames.innerHTML = '';
							jogadoresCopy();
							paisesCopy();

							for(let i = 0; i < player1Square.length; i++){
								player1Square[i].innerHTML = '';
								player2Square[i].innerHTML = '';
							}
						}

					}else if(modeValue == 'computador'){
					if(pc.classList.contains('pulse')){
							let audio = new Audio('assets/audio/erro.mp3');
							audio.play();
							imagePanel.style.display = 'none';
							player1Square[errosJ1].innerHTML = perdeu[errosJ1];
							errosJ1++;
							showWord.innerHTML = '';//So para garantir, mas ele nunca deixa o tempo acabar
							pc.classList.remove('pulse');
							player.classList.add('pulse');
							temporizador();
						}else if(player.classList.contains('pulse')){
							let audio = new Audio('assets/audio/erro.mp3');
							audio.play();
							imagePanel.style.display = 'none';
							player2Square[errosJ2].innerHTML = perdeu[errosJ2];
							errosJ2++;
							showWord.innerHTML = '';
							player.classList.remove('pulse');
							pc.classList.add('pulse');
							temporizador();
							setTimeout(playFunctionPC,2000);
						}

				if(errosJ2 == 8){
						pontosPc++;
						alert("computador venceu!");
						pontuacaoJ1.innerHTML = `pontuação pc: <span style='color:#f00'>${pontosPc}pt</span>`;
						pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
						errosJ1 = 0;
						errosJ2 = 0;
						nomesExcluidos = [];
						deletedNames.innerHTML = '';
						jogadoresCopy();
						paisesCopy();

						for(let i = 0; i < player1Square.length; i++){
							player1Square[i].innerHTML = '';
							player2Square[i].innerHTML = '';
						}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
					}else if(errosJ1 == 8){
							pontosJ++;
							alert(`${username} venceu!`);
							pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosPc}pt</span>`;
							pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
							errosJ1 = 0;
							errosJ2 = 0;
							nomesExcluidos = [];
							deletedNames.innerHTML = '';
							jogadoresCopy();
							paisesCopy();

							for(let i = 0; i < player1Square.length; i++){
								player1Square[i].innerHTML = '';
								player2Square[i].innerHTML = '';
							}
							localStorage.setItem('pointsPc', pontosPc);
							localStorage.setItem('pointsJ', pontosJ);
						}
					}
				}
			},1000);
}
function inicia(){
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
					alert('categoria não disponivel no momento!');
				break;
				case 'computador':
				//caso de pc
					alert('categoria não disponivel no momento!');
				break;
			}
		break;
		case 'jogador':
			switch(modeValue){
				case 'amigo':
				player1 = document.querySelector('#player1');
				player2 = document.querySelector('#player2');
				let interrogaJ1 = document.querySelector('#question-mark-j1');
				let interrogaJ2 = document.querySelector('#question-mark-j2');
				if(playing){
					let playerStart = Math.round(Math.random() * 1);
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
						if(e.keyCode == 38){
							finish();
						}
					});
				}
				break;
				case 'computador':
				pc = document.querySelector('#player1');
				player = document.querySelector('#player2');
				let interrogaPC = document.querySelector('#question-mark-j1');
				let interrogaJ = document.querySelector('#question-mark-j2');
				let spanPC = document.querySelector('.player1 span');
				let spanJ = document.querySelector('.player2 span');
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:red;'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:red;'>${pontosJ}pt</span>`;
				spanPC.innerHTML = 'Comput';
				let usernameSpan;
				if(username == 'null' || username == ''){
					usernameSpan = 'Jogador2';
				}else{
					usernameSpan = username.slice(0,8);
				}
				spanJ.innerHTML = `${usernameSpan}`;
				pc.innerHTML = 'PC';
				player.innerHTML = 'J';
				if(playing){
					let playerStart = Math.round(Math.random() * 1);
					if(playerStart == '0'){
						if(player.classList.contains('pulse')){
							player.classList.remove('pulse');
						}
						pc.classList.add('pulse');
						setTimeout(playFunctionPC, 2000);
					}else if(playerStart == '1'){
						if(pc.classList.contains('pulse')){
							pc.classList.remove('pulse');
						}
						player.classList.add('pulse');
					}
					play.addEventListener('click', playFunctionPC);
					interrogaJ.addEventListener('click',()=>{
						if(player.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga2J();
							}else{
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
							playFunctionPC();
						}
					});
					done.addEventListener('click', finishPC);
					document.addEventListener('keyup',(e)=>{
						if(e.keyCode == 38){
							finishPC();
						}
					});
				}
				break;
			}
		break;
		case 'país':
			switch(modeValue){
					case 'amigo':
				player1 = document.querySelector('#player1');
				player2 = document.querySelector('#player2');
				let interrogaJ1 = document.querySelector('#question-mark-j1');
				let interrogaJ2 = document.querySelector('#question-mark-j2');
				if(playing){
					let playerStart = Math.round(Math.random() * 1);
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
								interroga1Pais();
							}else{
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
								interroga2Pais();
							}else{
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
						if(e.keyCode == 38){
							finishPais();
						}
					});
				}
				break;
					case 'computador':
				pc = document.querySelector('#player1');
				player = document.querySelector('#player2');
				let interrogaPC = document.querySelector('#question-mark-j1');
				let interrogaJ = document.querySelector('#question-mark-j2');
				let spanPC = document.querySelector('.player1 span');
				let spanJ = document.querySelector('.player2 span');
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:red;'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:red;'>${pontosJ}pt</span>`;
				spanPC.innerHTML = 'Comput';
				let usernameSpan;
				if(username == 'null' || username == ''){
					usernameSpan = 'Jogador2';
				}else{
					usernameSpan = username.slice(0,8);
				}
				spanJ.innerHTML = `${usernameSpan}`;
				pc.innerHTML = 'PC';
				player.innerHTML = 'J';
				if(playing){
					let playerStart = Math.round(Math.random() * 1);
					if(playerStart == '0'){
						if(player.classList.contains('pulse')){
							player.classList.remove('pulse');
						}
						pc.classList.add('pulse');
						setTimeout(playFunctionPCPais, 2000);
					}else if(playerStart == '1'){
						if(pc.classList.contains('pulse')){
							pc.classList.remove('pulse');
						}
						player.classList.add('pulse');
					}
					play.addEventListener('click', playFunctionPCPais);
					interrogaJ.addEventListener('click',()=>{
						if(player.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga2JPais();
							}else{
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
							playFunctionPCPais();
						}
					});
					done.addEventListener('click', finishPCPais);
					document.addEventListener('keyup',(e)=>{
						if(e.keyCode == 38){
							finishPCPais();
						}
					});
				}
				break;
			}
		break;
		default:
		alert('Escolha uma categoria válida!');
	}
	typedLetter.focus();
}

function playFunction(){
	if(player1.classList.contains('pulse')){
			if(typedLetter.value !== ''){
				showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
				player1.classList.remove('pulse');
				player2.classList.add('pulse');
				typedLetter.value = '';
				clearInterval(time);
				temporizador();
			}else{
				alert('O jogador 1 precisa digitar alguma letra');
			}
	}else if(player2.classList.contains('pulse')){
		if(typedLetter.value !== ''){
			showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
			player2.classList.remove('pulse');
			player1.classList.add('pulse');
			typedLetter.value = '';
			clearInterval(time);
			temporizador();
		}else{
			alert('O jogador 2 precisa digitar alguma letra');
		}
	}
			typedLetter.focus();
		}

		function playFunctionPC(){
			let pc = document.querySelector('#player1');
			let player = document.querySelector('#player2');
			if(pc.classList.contains('pulse')){
					if(showWord.innerHTML !== ''){
						let resPC = jog.findIndex((item, index)=>{
							if(item.nome.startsWith(showWord.innerHTML.toLowerCase()) || item.sobrenome.startsWith(showWord.innerHTML.toLowerCase())){
								return true;
							}else{
								return false;
							}
						});
						if(resPC > -1 && jog[resPC].nome.startsWith(showWord.innerHTML.toLowerCase())){
							if(showWord.innerHTML.length < jog[resPC].nome.length){
								let abecedario = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
								let position = Math.round(Math.random() * (abecedario.length - 1));
								let letraIncorreta = abecedario[position];
								let letras = [jog[resPC].nome[showWord.innerHTML.length],jog[resPC].nome[showWord.innerHTML.length],jog[resPC].nome[showWord.innerHTML.length],jog[resPC].nome[showWord.innerHTML.length],letraIncorreta, jog[resPC].nome[showWord.innerHTML.length]];
								let letraAleatoria = Math.round(Math.random() * (letras.length - 1));
								let letrasPosicaoI = letras[letraAleatoria];
								let arrayOpcoes = [jog[resPC].nome[showWord.innerHTML.length], letrasPosicaoI];
								let zeroUm = Math.round(Math.random() * (arrayOpcoes.length - 1));
								let nomePosicaoI = arrayOpcoes[zeroUm];
								showWord.innerHTML += nomePosicaoI.toUpperCase();
								pc.classList.remove('pulse');
								player.classList.add('pulse');
							}else{
								finishPC();
									setTimeout(playFunctionPC, 2000);
							}
						}else if(resPC > -1 && jog[resPC].sobrenome.startsWith(showWord.innerHTML.toLowerCase())){
							if(showWord.innerHTML.length < jog[resPC].sobrenome.length){
								showWord.innerHTML += jog[resPC].sobrenome[showWord.innerHTML.length].toUpperCase();
								pc.classList.remove('pulse');
								player.classList.add('pulse');
							}else{
								finishPC();
									setTimeout(playFunctionPC, 2000);
							}

						}else{
							if(pc.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga1PC();
								setTimeout(playFunctionPC, 2000);
							}else{
								alert('Formem o nome de um jogador primero!');
							}
							typedLetter.focus();
						}else{
							alert('Não é a sua vez de jogar!');
							typedLetter.focus();
						}
						}
		
						typedLetter.value = '';
					}else{
						let randomNumber = Math.round(Math.random() * (jog.length - 1));
						if(jog[randomNumber].nome[0] > 'l'){
							showWord.innerHTML = jog[randomNumber].sobrenome[0].toUpperCase();
						}else{
							showWord.innerHTML = jog[randomNumber].nome[0].toUpperCase();
						}
						pc.classList.remove('pulse');
						player.classList.add('pulse');
						typedLetter.value = '';
					}
					clearInterval(time);
					temporizador();
	}else if(player.classList.contains('pulse')){
		if(typedLetter.value !== ''){
			showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
			player.classList.remove('pulse');
			pc.classList.add('pulse');
			typedLetter.value = '';
			clearInterval(time);
			temporizador();
			setTimeout(playFunctionPC, 2000);
		}else{
			alert(`O ${username} precisa digitar alguma letra`);
		}
	}
			typedLetter.focus();
		}

		function playFunctionPCPais(){
			let pc = document.querySelector('#player1');
			let player = document.querySelector('#player2');
			if(pc.classList.contains('pulse')){
					if(showWord.innerHTML !== ''){
						let resPC = country.findIndex((item, index)=>{
							if(item.nome.startsWith(showWord.innerHTML.toLowerCase())){
								return true;
							}else{
								return false;
							}
						});
						if(resPC > -1 && country[resPC].nome.startsWith(showWord.innerHTML.toLowerCase())){
							if(showWord.innerHTML.length < country[resPC].nome.length){
								let abecedario = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X','Z'];
								let position = Math.round(Math.random() * (abecedario.length - 1));
								let letraIncorreta = abecedario[position];
								let letras = [country[resPC].nome[showWord.innerHTML.length],country[resPC].nome[showWord.innerHTML.length], country[resPC].nome[showWord.innerHTML.length],country[resPC].nome[showWord.innerHTML.length],letraIncorreta, country[resPC].nome[showWord.innerHTML.length]];
								let letraAleatoria = Math.round(Math.random() * (letras.length - 1));
								let letrasPosicaoI = letras[letraAleatoria];
								let arrayOpcoes = [country[resPC].nome[showWord.innerHTML.length], letrasPosicaoI];
								let zeroUm = Math.round(Math.random() * (arrayOpcoes.length - 1));
								let nomePosicaoI = arrayOpcoes[zeroUm];
								showWord.innerHTML += nomePosicaoI.toUpperCase();
								pc.classList.remove('pulse');
								player.classList.add('pulse');
							}else{
								finishPCPais();
								setTimeout(playFunctionPC, 2000);
							}
						}else{
							if(pc.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga1PCPais();
								setTimeout(playFunctionPC, 2000);
							}else{
								alert('Formem o nome de um jogador primero!');
							}
							typedLetter.focus();
						}else{
							alert('Não é a sua vez de jogar!');
							typedLetter.focus();
						}
						}
		
						typedLetter.value = '';
					}else{
						let randomNumber = Math.round(Math.random() * (country.length - 1));
						showWord.innerHTML = country[randomNumber].nome[0].toUpperCase();
						pc.classList.remove('pulse');
						player.classList.add('pulse');
						typedLetter.value = '';
					}
					clearInterval(time);
					temporizador();
	}else if(player.classList.contains('pulse')){
		if(typedLetter.value !== ''){
			showWord.innerHTML += `${typedLetter.value.toUpperCase()}`;
			player.classList.remove('pulse');
			pc.classList.add('pulse');
			typedLetter.value = '';
			clearInterval(time);
			temporizador();
			setTimeout(playFunctionPCPais, 2000);
		}else{
			alert(`O ${username} precisa digitar alguma letra`);
		}
	}
			typedLetter.focus();
		}

		function interroga1(){
			let promptText = prompt("J2, digite as restantes letras");
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt1 = jog.findIndex((item)=>{
				if(item.nome == validation.toLowerCase() || item.sobrenome == validation.toLowerCase()){
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
				playerName.innerHTML = `Nome: ${jog[searchResultInt1].nome} ${jog[searchResultInt1].sobrenome}`;
				playerClub.innerHTML = `Clube: ${jog[searchResultInt1].clube}`;
				if(jog[searchResultInt1].img !== undefined){
					playerImg.src = jog[searchResultInt1].img;
				}else{
					playerImg.src = 'assets/images/anonimo.jpg';
				}
				nomesExcluidos.push(`${jog[searchResultInt1].nome} ${jog[searchResultInt1].sobrenome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				jog.splice(searchResultInt1,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player2Square[errosJ2].innerHTML = perdeu[errosJ2];
				errosJ2++;
			}
			if(errosJ2 == 8){
				pontosJ1++;
				alert('j2 perdeu!');
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			else if(errosJ1 == 8){
				pontosJ2++;
				alert("Jogador 1 perdeu!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			if(jog.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga1Pais(){
			let promptText = prompt("J2, digite as restantes letras");
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt1 = country.findIndex((item)=>{
				if(item.nome == validation.toLowerCase()){
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
				playerName.innerHTML = `Nome: ${country[searchResultInt1].nome}`;
				playerClub.innerHTML = `Continente: ${country[searchResultInt1].continente}`;
				if(country[searchResultInt1].img !== undefined){
					playerImg.src = country[searchResultInt1].img;
				}else{
					playerImg.src = 'assets/images/anonimoP.jpg';
				}
				nomesExcluidos.push(`${country[searchResultInt1].nome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				country.splice(searchResultInt1,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player2Square[errosJ2].innerHTML = perdeu[errosJ2];
				errosJ2++;
			}
			if(errosJ2 == 8){
				pontosJ1++;
				alert('Jogador 1 ganhou!');
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			else if(errosJ1 == 8){
				pontosJ2++;
				alert("Jogador 2 ganhou!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			if(country.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga1PC(){
			let promptText = prompt(`${username}, digite as restantes letras`);
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt1 = jog.findIndex((item)=>{
				if(item.nome == validation.toLowerCase() || item.sobrenome == validation.toLowerCase()){
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
				playerName.innerHTML = `Nome: ${jog[searchResultInt1].nome} ${jog[searchResultInt1].sobrenome}`;
				playerClub.innerHTML = `Clube: ${jog[searchResultInt1].clube}`;
				if(jog[searchResultInt1].img !== undefined){
					playerImg.src = jog[searchResultInt1].img;
				}else{
					playerImg.src = 'assets/images/anonimo.jpg';
				}
				nomesExcluidos.push(`${jog[searchResultInt1].nome} ${jog[searchResultInt1].sobrenome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				jog.splice(searchResultInt1,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player2Square[errosJ2].innerHTML = perdeu[errosJ2];
				errosJ2++;
			}
			if(errosJ2 == 8){
				pontosPc++;
				alert('computador venceu!');
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			else if(errosJ1 == 8){
				pontosJ++;
				alert(`${username} venceu!`);
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			if(jog.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga1PCPais(){
			let promptText = prompt(`${username}, digite as restantes letras`);
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt1 = country.findIndex((item)=>{
				if(item.nome == validation.toLowerCase()){
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
				playerName.innerHTML = `Nome: ${country[searchResultInt1].nome}`;
				playerClub.innerHTML = `Continente: ${country[searchResultInt1].continente}`;
				if(country[searchResultInt1].img !== undefined){
					playerImg.src = country[searchResultInt1].img;
				}else{
					playerImg.src = 'assets/images/anonimoP.jpg';
				}
				nomesExcluidos.push(`${country[searchResultInt1].nome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				country.splice(searchResultInt1,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player2Square[errosJ2].innerHTML = perdeu[errosJ2];
				errosJ2++;
			}
			if(errosJ2 == 8){
				pontosPc++;
				alert('computador venceu!');
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			else if(errosJ1 == 8){
				pontosJ++;
				alert(`${username} venceu!`);
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			if(country.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga2J(){
			let indice = jog.findIndex((item)=>{
				if(item.nome.startsWith(showWord.innerHTML.toLowerCase()) || item.sobrenome.startsWith(showWord.innerHTML.toLowerCase())){
								return true;
							}else{
								return false;
							}
			});
			let promptText;
			if(indice > -1 && jog[indice].nome.startsWith(showWord.innerHTML.toLowerCase())){
				promptText = jog[indice].nome;
			}else if(indice > -1 && jog[indice].sobrenome.startsWith(showWord.innerHTML.toLowerCase())){
				promptText = jog[indice].sobrenome;
			}else{
				promptText = '';
			}
			let validation = `${promptText}`;
			let searchResultInt2 = jog.findIndex((item)=>{
				if(item.nome == validation.toLowerCase() || item.sobrenome == validation.toLowerCase()){
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
			playerName.innerHTML = `Nome: ${jog[searchResultInt2].nome} ${jog[searchResultInt2].sobrenome}`;
			playerClub.innerHTML = `Clube: ${jog[searchResultInt2].clube}`;
			if(jog[searchResultInt2].img !== undefined){
				playerImg.src = jog[searchResultInt2].img;
			}else{
				playerImg.src = 'assets/images/anonimo.jpg';
			}
			nomesExcluidos.push(`${jog[searchResultInt2].nome} ${jog[searchResultInt2].sobrenome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				jog.splice(searchResultInt2,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
			}
			if(errosJ2 == 8){
				pontosPc++;
				alert("Computador  venceu!");
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			else if(errosJ1 == 8){
				pontosJ++;
				alert(`${username} venceu!`);
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			if(jog.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga2JPais(){
			let indice = country.findIndex((item)=>{
				if(item.nome.startsWith(showWord.innerHTML.toLowerCase())){
								return true;
							}else{
								return false;
							}
			});
			let promptText;
			if(indice > -1 && country[indice].nome.startsWith(showWord.innerHTML.toLowerCase())){//nao precisa da segunda condicao
				promptText = country[indice].nome;
			}else{
				promptText = '';
			}
			let validation = `${promptText}`;
			let searchResultInt2 = country.findIndex((item)=>{
				if(item.nome == validation.toLowerCase()){
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
			playerName.innerHTML = `Nome: ${country[searchResultInt2].nome}`;
			playerClub.innerHTML = `Continente: ${country[searchResultInt2].continente}`;
			if(country[searchResultInt2].img !== undefined){
				playerImg.src = country[searchResultInt2].img;
			}else{
				playerImg.src = 'assets/images/anonimoP.jpg';
			}
			nomesExcluidos.push(`${country[searchResultInt2].nome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				country.splice(searchResultInt2,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
			}
			if(errosJ2 == 8){
				pontosPc++;
				alert("Computador  venceu!");
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			else if(errosJ1 == 8){
				pontosJ++;
				alert(`${username} venceu!`);
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
				pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
						localStorage.setItem('pointsPc', pontosPc);
						localStorage.setItem('pointsJ', pontosJ);
			}
			if(country.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

		function interroga2(){
			let promptText = prompt("J1, digite as restantes letras");
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt2 = jog.findIndex((item)=>{
				if(item.nome == validation.toLowerCase() || item.sobrenome == validation.toLowerCase()){
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
			playerName.innerHTML = `Nome: ${jog[searchResultInt2].nome} ${jog[searchResultInt2].sobrenome}`;
			playerClub.innerHTML = `Clube: ${jog[searchResultInt2].clube}`;
			if(jog[searchResultInt2].img !== undefined){
				playerImg.src = jog[searchResultInt2].img;
			}else{
				playerImg.src = 'assets/images/anonimo.jpg';
			}
			nomesExcluidos.push(`${jog[searchResultInt2].nome} ${jog[searchResultInt2].sobrenome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				jog.splice(searchResultInt2,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
			}
			if(errosJ2 == 8){
				pontosJ1++;
				alert("Jogador J1  venceu!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			else if(errosJ1 == 8){
				pontosJ2++;
				alert("Jogador J2 venceu!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			if(jog.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				jogadoresCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

	function interroga2Pais(){
			let promptText = prompt("J1, digite as restantes letras");
			let validation = `${showWord.innerHTML}${promptText}`;
			let searchResultInt2 = country.findIndex((item)=>{
				if(item.nome == validation.toLowerCase()){
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
			playerName.innerHTML = `Nome: ${country[searchResultInt2].nome}`;
			playerClub.innerHTML = `Continente: ${country[searchResultInt2].continente}`;
			if(country[searchResultInt2].img !== undefined){
				playerImg.src = country[searchResultInt2].img;
			}else{
				playerImg.src = 'assets/images/anonimoP.jpg';
			}
			nomesExcluidos.push(`${country[searchResultInt2].nome}`);
				deletedNames.innerHTML = '';
				nomesExcluidos.sort();
				for(let i = 0; i < nomesExcluidos.length; i++){
					deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
				}
				country.splice(searchResultInt2,1);
			}else{
				let audio = new Audio('assets/audio/erro.mp3');
				audio.play();
				imagePanel.style.display = 'none';
				player1Square[errosJ1].innerHTML = perdeu[errosJ1];
				errosJ1++;
			}
			if(errosJ2 == 8){
				pontosJ1++;
				alert("Jogador J1  venceu!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			else if(errosJ1 == 8){
				pontosJ2++;
				alert("Jogador J2 venceu!");
				pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}
			}
			if(jog.length == 0){
				alert('Jogo Empatado!');
				errosJ1 = 0;
				errosJ2 = 0;
				nomesExcluidos = [];
				deletedNames.innerHTML = '';
				paisesCopy();

				for(let i = 0; i < player1Square.length; i++){
					player1Square[i].innerHTML = '';
					player2Square[i].innerHTML = '';
				}

			}
			showWord.innerHTML = '';
			clearInterval(time);
			temporizador();
		}

				function finish(){
						if(showWord.innerHTML !== '' && player1.classList.contains('pulse')){
								let searchResult = jog.findIndex((item)=>{
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
										playerName.innerHTML = `Nome: ${jog[searchResult].nome} ${jog[searchResult].sobrenome}`;
										playerClub.innerHTML = `Clube: ${jog[searchResult].clube}`;
										if(jog[searchResult].img !== undefined){
											playerImg.src = jog[searchResult].img;
										}else{
											playerImg.src = 'assets/images/anonimo.jpg';
										}
										nomesExcluidos.push(`${jog[searchResult].nome} ${jog[searchResult].sobrenome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
										jog.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player1Square[errosJ1].innerHTML = perdeu[errosJ1];
										errosJ1++;
									}
									clearInterval(time);
									temporizador();
								}else if(showWord.innerHTML !== '' && player2.classList.contains('pulse')){
									let searchResult = jog.findIndex((item)=>{
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
											playerName.innerHTML = `Nome: ${jog[searchResult].nome} ${jog[searchResult].sobrenome}`;
											playerClub.innerHTML = `Clube: ${jog[searchResult].clube}`;
											if(jog[searchResult].img !== undefined){
											playerImg.src = jog[searchResult].img;
										}else{
												playerImg.src = 'assets/images/anonimo.jpg';
										}
										nomesExcluidos.push(`${jog[searchResult].nome} ${jog[searchResult].sobrenome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
											jog.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player2Square[errosJ2].innerHTML = perdeu[errosJ2];
										errosJ2++;
									}
									clearInterval(time);
									temporizador();
								}else{
									//Colocar um audio de aviso
									alert('Jogador 1 ou  jogador 2 não preencheu nenhuma letra!');
								}
								if(errosJ2 == 8){
									pontosJ1++;
									alert("Jogador 2 perdeu!");
									pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
									pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									jogadoresCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
								}
									else if(errosJ1 == 8){
										pontosJ2++;
										alert("Jogador 1 perdeu!");
										pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
										pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
										errosJ1 = 0;
										errosJ2 = 0;
										nomesExcluidos = [];
										deletedNames.innerHTML = '';
										jogadoresCopy();

										for(let i = 0; i < player1Square.length; i++){
											player1Square[i].innerHTML = '';
											player2Square[i].innerHTML = '';
										}
									}
									if(jog.length == 0){
									alert('Jogo Empatado!');
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									jogadoresCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}

								}
								showWord.innerHTML = '';
						}

				function finishPais(){
						if(showWord.innerHTML !== '' && player1.classList.contains('pulse')){
								let searchResult = country.findIndex((item)=>{
									if(item.nome == showWord.innerHTML.toLowerCase()){
										return true;
									}else{
										return false;
									}
								});
									if(searchResult > -1){
										let audio = new Audio('assets/audio/applause3.mp3');
										audio.play();
										imagePanel.style.display = 'flex';
										playerName.innerHTML = `Nome: ${country[searchResult].nome}`;
										playerClub.innerHTML = `Continente: ${country[searchResult].continente}`;
										if(country[searchResult].img !== undefined){
											playerImg.src = country[searchResult].img;
										}else{
											playerImg.src = 'assets/images/anonimoP.jpg';
										}
										nomesExcluidos.push(`${country[searchResult].nome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
										country.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player1Square[errosJ1].innerHTML = perdeu[errosJ1];
										errosJ1++;
									}
									clearInterval(time);
									temporizador();
								}else if(showWord.innerHTML !== '' && player2.classList.contains('pulse')){
									let searchResult = country.findIndex((item)=>{
										if(item.nome == showWord.innerHTML.toLowerCase()){
											return true;
										}else{
											return false;
										}
									});
										if(searchResult > -1){
											let audio = new Audio('assets/audio/applause3.mp3');
											audio.play();
											imagePanel.style.display = 'flex';
											playerName.innerHTML = `Nome: ${country[searchResult].nome}`;
											playerClub.innerHTML = `Continente: ${country[searchResult].continente}`;
											if(country[searchResult].img !== undefined){
											playerImg.src = country[searchResult].img;
										}else{
												playerImg.src = 'assets/images/anonimoP.jpg';
										}
										nomesExcluidos.push(`${country[searchResult].nome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
											country.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player2Square[errosJ2].innerHTML = perdeu[errosJ2];
										errosJ2++;
									}
									clearInterval(time);
									temporizador();
								}else{
									alert('Jogador 1 ou  jogador 2 não preencheu nenhuma letra!');
								}
								if(errosJ2 == 8){
									pontosJ1++;
									alert("Jogador 1 venceu!");
									pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
									pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									paisesCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
								}
									else if(errosJ1 == 8){
										pontosJ2++;
										alert("Jogador 2 venceu!");
										pontuacaoJ1.innerHTML = `pontuação J1: <span style='color:#f00'>${pontosJ1}pt</span>`;
										pontuacaoJ2.innerHTML = `pontuação J2: <span style='color:#f00'>${pontosJ2}pt</span>`;
										errosJ1 = 0;
										errosJ2 = 0;
										nomesExcluidos = [];
										deletedNames.innerHTML = '';
										paisesCopy();

										for(let i = 0; i < player1Square.length; i++){
											player1Square[i].innerHTML = '';
											player2Square[i].innerHTML = '';
										}
									}
									if(jog.length == 0){
									alert('Jogo Empatado!');
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									paisesCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}

								}
								showWord.innerHTML = '';
						}

					function finishPC(){
						let pc = document.querySelector('#player1');
						let player = document.querySelector('#player2');
						if(showWord.innerHTML !== '' && pc.classList.contains('pulse')){
								let searchResult = jog.findIndex((item)=>{
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
										playerName.innerHTML = `Nome: ${jog[searchResult].nome} ${jog[searchResult].sobrenome}`;
										playerClub.innerHTML = `Clube: ${jog[searchResult].clube}`;
										if(jog[searchResult].img !== undefined){
											playerImg.src = jog[searchResult].img;
										}else{
											playerImg.src = 'assets/images/anonimo.jpg';
										}
										nomesExcluidos.push(`${jog[searchResult].nome} ${jog[searchResult].sobrenome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
										jog.splice(searchResult,1);

									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player1Square[errosJ1].innerHTML = perdeu[errosJ1];
										errosJ1++;
								
									}
									clearInterval(time);
									temporizador();
								}else if(showWord.innerHTML !== '' && player.classList.contains('pulse')){
									let searchResult = jog.findIndex((item)=>{
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
											playerName.innerHTML = `Nome: ${jog[searchResult].nome} ${jog[searchResult].sobrenome}`;
											playerClub.innerHTML = `Clube: ${jog[searchResult].clube}`;
											if(jog[searchResult].img !== undefined){
											playerImg.src = jog[searchResult].img;
										}else{
												playerImg.src = 'assets/images/anonimo.jpg';
										}
										nomesExcluidos.push(`${jog[searchResult].nome} ${jog[searchResult].sobrenome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
											jog.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player2Square[errosJ2].innerHTML = perdeu[errosJ2];
										errosJ2++;
									}
									clearInterval(time);
									temporizador();
								}else{
									//Colocar um audio de aviso
									alert(`${username}  ou  pc não preencheu nenhuma letra!`);
								}
								if(errosJ2 == 8){
									pontosPc++;
									alert("computador venceu!");
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
									pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									jogadoresCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
									localStorage.setItem('pointsPc', pontosPc);
									localStorage.setItem('pointsJ', pontosJ);
								}else if(errosJ1 == 8){
									pontosJ++;
									alert(`${username} venceu!`);
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
									pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									jogadoresCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
									localStorage.setItem('pointsPc', pontosPc);
									localStorage.setItem('pointsJ', pontosJ);
								}
								if(jog.length == 0){
									alert('Jogo Empatado!');
													errosJ1 = 0;
													errosJ2 = 0;
													nomesExcluidos = [];
													deletedNames.innerHTML = '';
													jogadoresCopy();

													for(let i = 0; i < player1Square.length; i++){
														player1Square[i].innerHTML = '';
														player2Square[i].innerHTML = '';
													}

											}
											showWord.innerHTML = '';
									}

				function finishPCPais(){
						let pc = document.querySelector('#player1');
						let player = document.querySelector('#player2');
						if(showWord.innerHTML !== '' && pc.classList.contains('pulse')){
								let searchResult = country.findIndex((item)=>{
									if(item.nome == showWord.innerHTML.toLowerCase()){
										return true;
									}else{
											return false;
									}
								});
									if(searchResult > -1){
										let audio = new Audio('assets/audio/applause3.mp3');
										audio.play();
										imagePanel.style.display = 'flex';
										playerName.innerHTML = `Nome: ${country[searchResult].nome}`;
										playerClub.innerHTML = `Continente: ${country[searchResult].continente}`;
										if(country[searchResult].img !== undefined){
											playerImg.src = country[searchResult].img;
										}else{
											playerImg.src = 'assets/images/anonimoP.jpg';
										}
										nomesExcluidos.push(`${country[searchResult].nome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
										country.splice(searchResult,1);

									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player1Square[errosJ1].innerHTML = perdeu[errosJ1];
										errosJ1++;
								
									}
									clearInterval(time);
									temporizador();
								}else if(showWord.innerHTML !== '' && player.classList.contains('pulse')){
									let searchResult = country.findIndex((item)=>{
										if(item.nome == showWord.innerHTML.toLowerCase()){
											return true;
										}else{
											return false;
										}
									});
										if(searchResult > -1){
											let audio = new Audio('assets/audio/applause3.mp3');
											audio.play();
											imagePanel.style.display = 'flex';
											playerName.innerHTML = `Nome: ${country[searchResult].nome}`;
											playerClub.innerHTML = `Continente: ${country[searchResult].continente}`;
											if(country[searchResult].img !== undefined){
											playerImg.src = country[searchResult].img;
										}else{
												playerImg.src = 'assets/images/anonimoP.jpg';
										}
										nomesExcluidos.push(`${country[searchResult].nome}`);
										deletedNames.innerHTML = '';
										nomesExcluidos.sort();
										for(let i = 0; i < nomesExcluidos.length; i++){
											deletedNames.innerHTML += `${nomesExcluidos[i]}<br>`;
										}
											country.splice(searchResult,1);
									}else{
										let audio = new Audio('assets/audio/erro.mp3');
										audio.play();
										imagePanel.style.display = 'none';
										player2Square[errosJ2].innerHTML = perdeu[errosJ2];
										errosJ2++;
									}
									clearInterval(time);
									temporizador();
								}else{
									alert(`${username}  ou  pc não preencheu nenhuma letra!`);
								}
								if(errosJ2 == 8){
									pontosPc++;
									alert("computador venceu!");
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
									pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									paisesCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
									localStorage.setItem('pointsPc', pontosPc);
									localStorage.setItem('pointsJ', pontosJ);
								}else if(errosJ1 == 8){
									pontosJ++;
									alert(`${username} venceu!`);
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosPc}pt</span>`;
									pontuacaoJ2.innerHTML = `${username}: <span style='color:#f00'>${pontosJ}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									paisesCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
									localStorage.setItem('pointsPc', pontosPc);
									localStorage.setItem('pointsJ', pontosJ);
								}
								if(country.length == 0){
									alert('Jogo Empatado!');
													errosJ1 = 0;
													errosJ2 = 0;
													nomesExcluidos = [];
													deletedNames.innerHTML = '';
													paisesCopy();

													for(let i = 0; i < player1Square.length; i++){
														player1Square[i].innerHTML = '';
														player2Square[i].innerHTML = '';
													}

											}
											showWord.innerHTML = '';
									}


	startGame.addEventListener('click', ()=>{
		let catValue = category.options[category.selectedIndex].value;
		if(catValue == 'cantor'){
			alert('categoria não disponivel no momento!');
		}else if(playing){
			alert('O jogo já começou!');
		}else{
			inicia();
			
			temporizador();
		}
	});
	deletedNamesId.addEventListener('click',()=>{
		if(playing){
			if(deletedNames.classList.contains('showNames')){
				deletedNames.classList.remove('showNames');
			}else{
				deletedNames.classList.add('showNames');
			}
		}else{
			alert('Inicie o jogo primeiro!');
		}
	});
	instructions.addEventListener('click',()=>{
		window.location = 'instructions.html';
	});