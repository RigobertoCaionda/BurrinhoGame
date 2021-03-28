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
					play.addEventListener('click',()=>{
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
					});
					done.addEventListener('click',()=>{
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
								alert('Jogador 1 concluiu e acertou!');
							}else{
								//Audio de erro
								alert('Jogador 1 concluiu e errou!');
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
									alert('Jogador 2 concluiu e acertou!');
							}else{
								//Audio de erro
								alert('Jogador 2 concluiu e errou!');
								player2Square[errosJ2].innerHTML = perdeu[errosJ2];
								errosJ2++;
							}
						}else{
							alert('Jogador 1 ou  jogador 2 não preencheu nenhuma letra!');
						}
						showWord.innerHTML = '';
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
});