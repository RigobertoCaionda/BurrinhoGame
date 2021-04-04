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
let pontosJ1 = 0;
let pontosJ2 = 0;
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
let time;
function jogadoresCopy(){
	jog = jogadores.map((item)=>{
		return item;
	});
	
}
jogadoresCopy();//

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
							showWord.innerHTML = '';//So para garantir, ele nunca deixa o tempo acabar
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

							for(let i = 0; i < player1Square.length; i++){
								player1Square[i].innerHTML = '';
								player2Square[i].innerHTML = '';
							}
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
				//regras para amigo
				player1 = document.querySelector('#player1');
				player2 = document.querySelector('#player2');
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
				pc = document.querySelector('#player1');
				player = document.querySelector('#player2');
				let interrogaPC = document.querySelector('#question-mark-j1');
				let interrogaJ = document.querySelector('#question-mark-j2');
				let spanPC = document.querySelector('.player1 span');
				let spanJ = document.querySelector('.player2 span');
				pontuacaoJ1.innerHTML = "pontuação PC: <span style='color:red;'>0</span>";
				pontuacaoJ2.innerHTML = "pontuação J: <span style='color:red;'>0</span>";
				spanPC.innerHTML = 'Comput';
				spanJ.innerHTML = 'Jogador';
				pc.innerHTML = 'PC';
				player.innerHTML = 'J';
				if(playing){
					let playerStart = Math.floor(Math.random() * 2);
					if(playerStart == '0'){
						if(player.classList.contains('pulse')){
							player.classList.remove('pulse');
						}
						pc.classList.add('pulse');
						setTimeout(playFunctionPC, 2000);//Quando o pc inicia ele ja chama a funcao playFunction
					}else if(playerStart == '1'){
						if(pc.classList.contains('pulse')){
							pc.classList.remove('pulse');
						}
						player.classList.add('pulse');
					}//Parei aqui
					play.addEventListener('click', playFunctionPC);
					interrogaJ.addEventListener('click',()=>{
						if(player.classList.contains('pulse')){
							if(showWord.innerHTML !== ''){
								interroga2J();
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
							playFunctionPC();
						}
					});
					done.addEventListener('click', finishPC);
					document.addEventListener('keyup',(e)=>{
						if(e.keyCode == 16){
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
					//caso amigo
					alert('categoria não disponivel no momento!');
					break;
					case 'computador':
					//caso de pc
					alert('categoria não disponivel no momento');
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
								let abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
								let position = Math.floor(Math.random() * abecedario.length);
								let letraIncorreta = abecedario[position];
								let letras = [jog[resPC].nome[showWord.innerHTML.length],letraIncorreta,jog[resPC].nome[showWord.innerHTML.length]];//Posso criar outro array para nao ser so A
								let letraAleatoria = Math.floor(Math.random() * letras.length);
								let letrasPosicaoI = letras[letraAleatoria];
								let arrayOpcoes = [jog[resPC].nome[showWord.innerHTML.length], letrasPosicaoI];
								let zeroUm = Math.floor(Math.random() * arrayOpcoes.length);
								let nomePosicaoI = arrayOpcoes[zeroUm];
								showWord.innerHTML += nomePosicaoI.toUpperCase();
								pc.classList.remove('pulse');
								player.classList.add('pulse');
							}else{
								finishPC();
									setTimeout(playFunctionPC, 2000);//Muito massa, foi dificil
							}
						}else if(resPC > -1 && jog[resPC].sobrenome.startsWith(showWord.innerHTML.toLowerCase())){
							if(showWord.innerHTML.length < jog[resPC].sobrenome.length){
								showWord.innerHTML += jog[resPC].sobrenome[showWord.innerHTML.length].toUpperCase();
								pc.classList.remove('pulse');
								player.classList.add('pulse');
							}else{
								finishPC();
									setTimeout(playFunctionPC, 2000);//Muito massa, foi dificil
							}

						}else{
							if(pc.classList.contains('pulse')){//Tlavez nao seja necessario
							if(showWord.innerHTML !== ''){
								interroga1PC();
								setTimeout(playFunctionPC, 2000);//Ver isso
							}else{//O else tmbm nao
								//efeitos sonoro para aviso
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
						let randomNumber = Math.floor(Math.random() * jog.length);
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
			alert('O jogador 2 precisa digitar alguma letra');
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

		function interroga1PC(){
			let promptText = prompt("Jogador, digite as restantes letras");
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
				alert('computador venceu!');
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
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
				alert("Jogador venceu!");
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
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
				pontosJ1++;
				alert("PC  venceu!");
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
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
				alert("Jogador venceu!");
				pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
				pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
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
									alert('Jogador  ou  pc não preencheu nenhuma letra!');
								}
								if(errosJ2 == 8){
									pontosJ1++;
									alert("computador venceu!");
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
									pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
									errosJ1 = 0;
									errosJ2 = 0;
									nomesExcluidos = [];
									deletedNames.innerHTML = '';
									jogadoresCopy();

									for(let i = 0; i < player1Square.length; i++){
										player1Square[i].innerHTML = '';
										player2Square[i].innerHTML = '';
									}
								}else if(errosJ1 == 8){
									pontosJ2++;
									alert("Jogador venceu!");
									pontuacaoJ1.innerHTML = `pontuação PC: <span style='color:#f00'>${pontosJ1}pt</span>`;
									pontuacaoJ2.innerHTML = `pontuação J: <span style='color:#f00'>${pontosJ2}pt</span>`;
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