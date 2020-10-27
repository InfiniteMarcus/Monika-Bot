let playerName;
let isGaming = false;
let gameTimeOut;
let turnNumb;
let matriz = ['@','@','@','@','@','@','@','@','@'];

let playerOption;
let botOption;

function startMatriz(){
    for(let i = 0; i < 9; i++)
           matriz[i] = '@';
}

function resetGame(){
    isGaming = false;
    gameTimeOut = 0;
    turnNumb = 0;
}

function startGame(msg, option){
    if(option != 'x' && option != 'o' && option != 'X' && option != 'O'){
        msg.reply('Deu probleminha aqui! Não se esqueça do "x" ou "o" no comando!');
        return; 
    }

    startMatriz();
    playerOption = option.toUpperCase();

    if(playerOption == 'X')
        botOption = 'O'
    else
        botOption = 'X';

    turnNumb = 1;
    isGaming = true;
    playerName = msg.author.username;
    gameTimeOut = 3000000;

    msg.reply('O jogo começou! Digite "monika -game" e os números da linha e coluna (1 a 3) para jogar!');
    printMatriz(msg);

    setInterval(resetGame, gameTimeOut);
}

function playerTurn(msg, x, y){
    if((x < 4 && x > 0) && (y < 4 && y > 0)){
        if(matriz[(x-1)*3 + (y-1)] == '@'){
            matriz[(x-1)*3 + (y-1)] = playerOption;
            printMatriz(msg);

            if(verifyWinner()){
                msg.reply("Você ganhou! Parabéns!!!");
                resetGame();
                return 1;
            }else if(turnNumb == 9){
                msg.reply("Deu empate! Ebaaaa");
                resetGame();
                return 1;
            }
            turnNumb++;
            return 0;
        }else{
            msg.reply("Posição ocupada!");
            return -1;
        }
    }else{
        msg.reply("Coordenadas inválidas!");
        return -1;
    }
}

function botTurn(msg){
    while(true){
		const x =  Math.floor((Math.random() *  3));
		const y =  Math.floor((Math.random() *  3));
		
		if(matriz[x*3 + y] == '@'){
            matriz[x*3 + y] = botOption;
            printMatriz(msg);
			break;
		}
    }
    if(verifyWinner()){
        msg.reply("Eu ganhei! Na próxima você vence!!!");
        resetGame();
    }
    turnNumb++;
}

function verifyWinner(){ 
	if((matriz[0] == matriz[1] && matriz[0] == matriz[2] && matriz[0] != '@')||
	(matriz[0] == matriz[4] && matriz[0] == matriz[8] && matriz[0] != '@')||
	(matriz[0] == matriz[3] && matriz[0] == matriz[6] && matriz[0] != '@')||
	(matriz[1] == matriz[4] && matriz[1] == matriz[7] && matriz[1] != '@')||
	(matriz[2] == matriz[5] && matriz[2] == matriz[8] && matriz[2] != '@')||
	(matriz[3] == matriz[4] && matriz[3] == matriz[5] && matriz[3] != '@')||
	(matriz[6] == matriz[7] && matriz[6] == matriz[8] && matriz[6] != '@')||
	(matriz[6] == matriz[4] && matriz[6] == matriz[2] && matriz[6] != '@'))
		return true;
	else
		return false;
}

function printMatriz(msg){
    let string = "```";
	for(i = 0; i < 9; i++){
        if(i%3 == 0 && i != 0)
            string += "\n";

        string += "|" + matriz[i] + "| ";
    }
    string += "```"
    msg.channel.send(string);
}

module.exports = {
	name: 'game',
    description: 'Vamos jogar juntos!',
    args: true,
    usage: '<_simbolo X or O_> ou <_cord X_> <_cord Y_>',
    aliases: ['g'],
    display: true,
	cooldown: 4,
	execute(bot, msg, args) {
        if(!isGaming){
            startGame(msg, args[0]);
        }else{
            if(msg.author.username !== playerName){
                msg.reply("Estou jogando com o " + playerName + ". Espere um pouquinho!");
                return 0;
            }else{
                if(args[0] == "" || args[1] == ""){
                    msg.reply("Falta coordenada ae!");
                    return 0;
                }else{
                    ans = playerTurn(msg, args[0], args[1]);
                    if(ans === -1) 
                        return 0;
                    else if(!ans){
                        msg.reply("Minha vez!");
                        setTimeout(botTurn(msg), 3000);
                        console.log(isGaming)
                    }
                    return 1;
                }
            }
        }
    },
};