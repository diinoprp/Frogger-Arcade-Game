// Inimigos que nosso jogador deve evitar

class Enemy {
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    constructor(y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = y;
        this.movX = 0;
        this.speed = Math.random() * 200;
    }

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
        if (this.movX === undefined) {return;}
        
        this.x += this.speed * dt;

        if (this.x > 550) {
            this.x = -50;
        }
        this.movX = 0;
    }

    // Desenhe o inimigo na tela, método exigido pelo jogo
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;

        this.movX = 0;
        this.movY = 0;
    }

    update(dt) {
        if (this.movX === undefined || this.movY === undefined) {return;}
        this.x += this.movX;
        this.y += this.movY;

        this.movX = 0;
        this.movY = 0;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                this.movX -= 101;
                break;
            case 'right':
                this.movX += 101;
                break;
            case 'up':
                this.movY -= 83;
                break;
            case 'down':
                this.movY += 83;
                break;
        }
    }
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

let player = new Player();
let allEnemies = [new Enemy(65), new Enemy(140), new Enemy(220)];

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
