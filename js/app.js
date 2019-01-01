'use strict';

let player;
let allEnemies;

let isModalOpen = false;

// Modal de Fim de Jogo
let modal = new tingle.modal({
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    onOpen: function() {
        isModalOpen = true;
    },
    onClose: function() {
        isModalOpen = false;
        spawnCharacters();
    }
});

modal.setContent("<h1 class='modalVitoria'>Parabéns, você venceu!</h1>");

// Inimigos que nosso jogador deve evitar

class Enemy {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    constructor(y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = -150;
        this.y = y;
        this.height = 50;
        this.width = 75;
        this.movX = 0;
        this.speed = this.getRandomMovementSpeed();

    }

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
        if (this.movX === undefined) { return; }
        if (isModalOpen) {return};

        this.x += this.speed * dt;

        if (this.x > 550) {
            this.x = -50;
            this.speed = this.getRandomMovementSpeed();
        }

        this.movX = 0;
    }

    // Desenhe o inimigo na tela, método exigido pelo jogo
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Gera velocidade de movimento aleatória para cada inimigo, com um valor mínimo.
    getRandomMovementSpeed() {
        let randomSpeed = Math.random();
        let minSpeed = 0.3;
        return (randomSpeed > minSpeed ? randomSpeed * 200 : minSpeed * 200);
    }
}

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 204;
        this.y = 404;
        this.height = 50;
        this.width = 75;

        this.movX = 0;
        this.movY = 0;
    }

    update(dt) {
        if (this.movX === undefined || this.movY === undefined) { return; };
        if (isModalOpen) {return};

        this.x += this.movX;
        this.y += this.movY;

        this.detectVictory();

        this.detectEnviromentCollision();

        // Verifica colisão com cada um dos inimigos
        for (let i = 0; i < allEnemies.length; i++) {
            if (this.detectCollision(allEnemies[i])) {
                spawnCharacters();
            }
        }

        this.movX = 0;
        this.movY = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Registra comandos do usuário.
    handleInput(key) {
        switch (key) {
            case 'left':
                this.movX -= 102;
                break;
            case 'right':
                this.movX += 102;
                break;
            case 'up':
                this.movY -= 83;
                break;
            case 'down':
                this.movY += 83;
                break;
        }
    }

    // Verifica colisão com um Inimigo
    detectCollision(enemy) {
        const enemyCollider = {
            x: enemy.x,
            y: enemy.y,
            width: enemy.width,
            height: enemy.height
        };

        const playerCollider = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        return (enemyCollider.x < playerCollider.x + playerCollider.width &&
            enemyCollider.x + enemyCollider.width > playerCollider.x &&
            enemyCollider.y < playerCollider.y + playerCollider.height &&
            enemyCollider.height + enemyCollider.y > playerCollider.y) ? true : false;
    }

    // Verifica se o jogador chegou na água e chama tratamento de fim de jogo
    detectVictory() {
        if (this.y < 50) {
            if (!isModalOpen) {
                modal.open();
            }
            return true;
        }       
    }

    // Verifica se o jogador colidiu com alguma parede
    detectEnviromentCollision() {
        const canvas = {
            width: $("#canvas").attr("width"),
            height: $("#canvas").attr("height")
        };
        //console.log(`(x,y): ${this.x},${this.y} | canvas: ${canvas.width},${canvas.height}`);
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height - 150 || this.y < 0) {
            spawnCharacters();
        }
    }
}

// Recria todos os personagens
function spawnCharacters() {
    player = new Player();
    allEnemies = [new Enemy(65), new Enemy(140), new Enemy(220)];
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
spawnCharacters();

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
