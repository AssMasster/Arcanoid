class Arkanoid {
constructor(canvas, context) {
    this.CANVAS_NODE = canvas;
    this.CTX = context;
    this.BALL_RADIUS = 10;
    this.PADDLE_WIDTH = 75;
    this.PADDLE_HEIGHT = 10;

    this.LEVELS = {
        1: { 
            rows: 5, 
            columns: 2,
            name: 'GREEN',
            colors: ['#006600', '#008800', '#00aa00']
        },
        2: { 
            rows: 5, 
            columns: 3,
            name: 'BLUE',
            colors: ['#002266', '#0044aa', '#0066cc']
        },
        3: { 
            rows: 5, 
            columns: 4,
            name: 'RED',
            colors: ['#660000', '#992222', '#cc3333']
        }
    };
    
    this.currentLevel = 1;
    this.maxLevel = 3;
    
    this.BRICK_WIDTH = 75;
    this.BRICK_HEIGHT = 20;
    this.BRICK_PADDING = 10;
    this.BRICK_OFFSET = 30;
    
    this.ballX = this.CANVAS_NODE.width / 2; 
    this.ballY = this.CANVAS_NODE.height - 30; 
    this.dx = 4;
    this.dy = -4;
    this.paddleX = (this.CANVAS_NODE.width - this.PADDLE_WIDTH) / 2;

    this.levelCompleted = false;
    this.gameOver = false;
    
    this.state = {
        'lives': 3,
        'score': 0
    }
    
    this.isPaused = false;
    this.isGameActive = false;
    
    this.briks = this.initBricks(this.currentLevel);

    this.draw = this.draw.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.toggleStartPause = this.toggleStartPause.bind(this);
    this.nextLevel = this.nextLevel.bind(this);

    this.scoreDisplay = document.getElementById('scoreDisplay');
    this.livesDisplay = document.getElementById('livesDisplay');
    this.levelDisplay = document.getElementById('levelDisplay');
    this.startPauseBtn = document.getElementById('startPauseBtn');
    
    this.setupStartPauseButton();
    this.setupEventListeners();
    
    this.updateScoreDisplay();
    this.updateLivesDisplay();
    this.updateLevelDisplay();
    
    this.sound = {
        "tap": new Audio('./assets/tap.wav'),
        "win": new Audio('./assets/win.wav'),
        "lose": new Audio('./assets/lose.wav')
    }
    
    this.showStartScreen = true;
    
    if (this.startPauseBtn) {
        this.startPauseBtn.textContent = '▶ START';
        this.startPauseBtn.classList.remove('paused');
    }
}

    getBrickColorByState(status, level) {
        const levelColors = this.LEVELS[level].colors;
        return levelColors[3 - status];
    }

    initBricks(level) {
        const levelConfig = this.LEVELS[level];
        const BRICK_ROW_COUNT = levelConfig.rows;
        const BRICK_COLUMN_COUNT = levelConfig.columns;
        
        const bricks = [];
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            bricks[c] = [];
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                let randomState = Math.floor(Math.random() * 3) + 1;
                bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: randomState,
                    color: this.getBrickColorByState(randomState, level),
                };
            }
        }
        return bricks;
    }

    resetLevel() {
        this.briks = this.initBricks(this.currentLevel);
        this.ballX = this.CANVAS_NODE.width / 2;
        this.ballY = this.CANVAS_NODE.height - 30;
        this.dx = 4;
        this.dy = -4;
        this.paddleX = (this.CANVAS_NODE.width - this.PADDLE_WIDTH) / 2;
        this.levelCompleted = false;
    }

    nextLevel() {
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            this.resetLevel();
            this.updateLevelDisplay();
        }
    }

    restartGame() {
        this.currentLevel = 1;
        this.state.lives = 3;
        this.state.score = 0;
        this.levelCompleted = false;
        this.gameOver = false;
        this.isGameActive = false;
        this.showStartScreen = true;
        this.isPaused = false;
        
        this.ballX = this.CANVAS_NODE.width / 2;
        this.ballY = this.CANVAS_NODE.height - 30;
        this.dx = 4;
        this.dy = -4;
        this.paddleX = (this.CANVAS_NODE.width - this.PADDLE_WIDTH) / 2;
        
        this.briks = this.initBricks(this.currentLevel);
        
        this.updateLivesDisplay();
        this.updateScoreDisplay();
        this.updateLevelDisplay();

        if (this.startPauseBtn) {
            this.startPauseBtn.textContent = '▶ START';
            this.startPauseBtn.classList.remove('paused');
        }
    }

    updateLevelDisplay() {
        if (this.levelDisplay) {
            this.levelDisplay.textContent = this.currentLevel;
        }
    }

    updateScoreDisplay() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = this.state.score;
            this.scoreDisplay.classList.add('highlight-score');
            setTimeout(() => {
                this.scoreDisplay.classList.remove('highlight-score');
            }, 200);
        }
    }

    updateLivesDisplay() {
        if (this.livesDisplay) {
            this.livesDisplay.textContent = this.state.lives;
            this.livesDisplay.classList.add('highlight-lives');
            setTimeout(() => {
                this.livesDisplay.classList.remove('highlight-lives');
            }, 200);
        }
    }

    setupStartPauseButton() {
        if (this.startPauseBtn) {
            this.startPauseBtn.removeEventListener('click', this.toggleStartPause);
            this.startPauseBtn.addEventListener('click', this.toggleStartPause);
        }
    }

    toggleStartPause() {
        if (!this.isGameActive) {
            this.isGameActive = true;
            this.isPaused = false;
            this.showStartScreen = false;
            this.gameOver = false;
            
            this.dx = 4;
            this.dy = -4;
            
            if (this.startPauseBtn) {
                this.startPauseBtn.textContent = '⏸ PAUSE';
                this.startPauseBtn.classList.add('paused');
            }
        } else {
            this.isPaused = !this.isPaused;
            
            if (this.startPauseBtn) {
                if (this.isPaused) {
                    this.startPauseBtn.textContent = '▶ RESUME';
                    this.startPauseBtn.classList.remove('paused');
                } else {
                    this.startPauseBtn.textContent = '⏸ PAUSE';
                    this.startPauseBtn.classList.add('paused');
                }
            }
        }
    }

    drawStartScreen() {
        this.CTX.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.CTX.fillRect(0, 0, this.CANVAS_NODE.width, this.CANVAS_NODE.height);
        
        this.CTX.fillStyle = "#ffffff";
        this.CTX.font = 'bold 28px Arial';
        this.CTX.fillText('🚀 ARKANOID', 
            this.CANVAS_NODE.width / 2 - 100, 
            this.CANVAS_NODE.height / 2 - 40);
        
        this.CTX.font = 'bold 24px Arial';
        this.CTX.fillStyle = "#96c93d";
        this.CTX.fillText('▶ START', 
            this.CANVAS_NODE.width / 2 - 55, 
            this.CANVAS_NODE.height / 2 + 20);
        
        this.CTX.font = '16px Arial';
        this.CTX.fillStyle = "#ffffff";
        this.CTX.fillText('Click button or press SPACE', 
            this.CANVAS_NODE.width / 2 - 100, 
            this.CANVAS_NODE.height / 2 + 70);
    }

    drawPauseScreen() {
        this.CTX.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.CTX.fillRect(0, 0, this.CANVAS_NODE.width, this.CANVAS_NODE.height);
        
        this.CTX.fillStyle = "#ffffff";
        this.CTX.font = 'bold 24px Arial';
        this.CTX.fillText('⏸ PAUSED', 
            this.CANVAS_NODE.width / 2 - 70, 
            this.CANVAS_NODE.height / 2 - 20);
        
        this.CTX.font = '16px Arial';
        this.CTX.fillText('Press SPACE or click RESUME', 
            this.CANVAS_NODE.width / 2 - 110, 
            this.CANVAS_NODE.height / 2 + 20);
    }

    setupEventListeners() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mousemove', this.handleMouseMove);

        document.removeEventListener('keydown', this.keydownHandler);

        this.keydownHandler = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                e.stopPropagation();

                this.toggleStartPause();
            }
        };

        document.addEventListener('keydown', this.keydownHandler);
    }

    handleMouseMove(e) {

        if (this.isPaused || !this.isGameActive || this.showStartScreen) return;
        
        const rect = this.CANVAS_NODE.getBoundingClientRect();
        const RELATIVE_X = e.clientX - rect.left;

        if (RELATIVE_X > 0 && RELATIVE_X < this.CANVAS_NODE.width) {
            this.paddleX = RELATIVE_X - this.PADDLE_WIDTH / 2;
        }
    }

    drawPaddle() {
        this.CTX.beginPath();
        this.CTX.rect(
            this.paddleX,
            this.CANVAS_NODE.height - this.PADDLE_HEIGHT,
            this.PADDLE_WIDTH,
            this.PADDLE_HEIGHT
        );
        this.CTX.fill();
        this.CTX.closePath();
    }

    drawBall() {
        this.CTX.beginPath();
        this.CTX.arc(
            this.ballX,
            this.ballY,
            this.BALL_RADIUS,
            0, Math.PI * 2
        );
        this.CTX.fill();
        this.CTX.closePath();
    }

    drawBricks() {
        const levelConfig = this.LEVELS[this.currentLevel];
        const BRICK_ROW_COUNT = levelConfig.rows;
        const BRICK_COLUMN_COUNT = levelConfig.columns;
        
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                if (this.briks[c] && this.briks[c][r] && this.briks[c][r].status > 0) {
                    const BRIK_X = r * (this.BRICK_WIDTH + this.BRICK_PADDING) + this.BRICK_OFFSET;
                    const BRIK_Y = c * (this.BRICK_HEIGHT + this.BRICK_PADDING) + this.BRICK_OFFSET;

                    this.briks[c][r].x = BRIK_X; 
                    this.briks[c][r].y = BRIK_Y;

                    this.CTX.beginPath(); 
                    this.CTX.rect(BRIK_X, BRIK_Y, this.BRICK_WIDTH, this.BRICK_HEIGHT);
                    this.CTX.fillStyle = this.briks[c][r].color;
                    this.CTX.fill();
                    this.CTX.closePath();
                }
            }
        }
    }

    detectCollision() {
        if (this.isPaused || !this.isGameActive || this.showStartScreen) return;
        
        const levelConfig = this.LEVELS[this.currentLevel];
        const BRICK_ROW_COUNT = levelConfig.rows;
        const BRICK_COLUMN_COUNT = levelConfig.columns;
        let activeBricks = 0;
        
        for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
            for (let r = 0; r < BRICK_ROW_COUNT; r++) {
                if (this.briks[c] && this.briks[c][r]) {
                    let brick = this.briks[c][r];

                    if (brick.status > 0) {
                        activeBricks++;
                        
                        const isCollisionTrue =
                            this.ballX > brick.x &&
                            this.ballX < brick.x + this.BRICK_WIDTH &&
                            this.ballY > brick.y &&
                            this.ballY < brick.y + this.BRICK_HEIGHT;

                        if (isCollisionTrue) {
                            this.dy = -this.dy;
                            this.sound.tap.play();
                            brick.status--;
                            brick.color = this.getBrickColorByState(brick.status, this.currentLevel);
                            
                            if (brick.status === 0) {
                                this.state.score += 100;
                                this.updateScoreDisplay();
                                activeBricks--;
                            }
                        }
                    }
                }
            }
        }
        
        if (activeBricks === 0 && !this.levelCompleted) {
            this.levelCompleted = true;
            
            if (this.currentLevel < this.maxLevel) {
                this.sound.win.play();
                setTimeout(() => {
                    alert(`Level ${this.currentLevel} complete! Moving to level ${this.currentLevel + 1}!`);
                    this.nextLevel();
                    this.levelCompleted = false;
                }, 100);
            } else {
                this.sound.win.play();
                setTimeout(() => {
                    alert('YOU WIN! Congratulations!');
                    document.location.reload();
                }, 100);
            }
        }
    }

draw() {
    this.CTX.clearRect(0, 0, this.CANVAS_NODE.width, this.CANVAS_NODE.height);

    const levelColors = {
        1: 'rgba(0, 20, 0, 0.1)',
        2: 'rgba(0, 0, 30, 0.1)',
        3: 'rgba(30, 0, 0, 0.1)'
    };
    
    this.CTX.fillStyle = levelColors[this.currentLevel] || '#000000';
    this.CTX.fillRect(0, 0, this.CANVAS_NODE.width, this.CANVAS_NODE.height);
    
    this.CTX.fillStyle = this.currentLevel === 1 ? '#00ff00' : 
                        this.currentLevel === 2 ? '#0088ff' : 
                        this.currentLevel === 3 ? '#ff5555' : '#0095DD';
    
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();
    
    if (this.isGameActive) {
        this.detectCollision();
    }
    if (!this.isPaused && this.isGameActive && !this.showStartScreen && !this.gameOver) {
        if (this.ballX + this.dx < this.BALL_RADIUS || 
            this.ballX + this.dx > this.CANVAS_NODE.width - this.BALL_RADIUS) {
            this.dx = -this.dx;
        }
        
        if (this.ballY + this.dy < this.BALL_RADIUS) {
            this.dy = -this.dy;
        }
        
        if (this.ballY + this.dy > this.CANVAS_NODE.height - this.BALL_RADIUS) {
            if (this.ballX > this.paddleX && this.ballX < this.paddleX + this.PADDLE_WIDTH) {
                this.dy = -this.dy;
            } else {
                if (this.state.lives <= 1 && !this.gameOver) {
                    this.gameOver = true;
                    this.sound.lose.play();
                    this.state.lives = 0;
                    this.updateLivesDisplay();
                    
                    setTimeout(() => {
                        alert('Game Over! Restarting from level 1...');
                        this.restartGame();
                    }, 100);
                } else if (this.state.lives > 1) {
                    this.state.lives--;
                    this.updateLivesDisplay();
                    
                    this.ballX = this.CANVAS_NODE.width / 2;
                    this.ballY = this.CANVAS_NODE.height - 30;
                    this.dx = 4;
                    this.dy = -4;
                    this.paddleX = (this.CANVAS_NODE.width - this.PADDLE_WIDTH) / 2;
                }
            }
        }

        this.ballX += this.dx;
        this.ballY += this.dy;
    }

    if (this.showStartScreen) {
        this.drawStartScreen();
    } else if (this.isPaused) {
        this.drawPauseScreen();
    }

    requestAnimationFrame(this.draw);
}

    start() {
        this.draw();
    }
}

const canvas = document.querySelector('#arkanoid');
const context = canvas.getContext('2d');
const game = new Arkanoid(canvas, context);
game.start();