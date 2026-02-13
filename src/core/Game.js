import { GameState } from './GameState.js';
import { Ball } from '../entities/Ball.js';
import { Paddle } from '../entities/Paddle.js';
import { LevelManager } from '../systems/LevelManager.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { Renderer } from '../systems/Renderer.js';
import { InputHandler } from '../systems/InputHandler.js';
import { UIManager } from '../ui/UIManager.js';
import { SoundManager } from '../systems/SoundManager.js';
import { CONFIG } from './config.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.state = new GameState();
        this.levelManager = new LevelManager();
        this.collisionSystem = new CollisionSystem();
        this.renderer = new Renderer(canvas);
        this.uiManager = new UIManager();
        this.soundManager = new SoundManager();
        this.inputHandler = new InputHandler(this);
        
        this.ball = null;
        this.paddle = null;
        this.bricks = [];
        
        this.init();
    }

    init() {
        this.paddle = new Paddle('NORMAL', this.canvas.width);
        this.paddle.setY(this.canvas.height - CONFIG.PADDLE.HEIGHT);
        
        this.resetBall();
        this.loadLevel(this.state.currentLevel);
        
        this.inputHandler.init();
        this.setupUISubscriptions();
    }

    setupUISubscriptions() {
        this.uiManager.updateScore(this.state.score);
        this.uiManager.updateLives(this.state.lives);
        this.uiManager.updateLevel(this.state.currentLevel);
        this.uiManager.updateStartPauseButton(false, false);
    }

    resetBall() {
        this.ball = new Ball('NORMAL', this.canvas.width / 2, this.canvas.height - 40);
        this.ball.stop();
    }

    loadLevel(level) {
        this.bricks = this.levelManager.createLevel(level);
    }

    toggleStartPause() {
        if (!this.state.isGameActive) {
            this.startGame();
        } else {
            this.state.isPaused = !this.state.isPaused;
            this.uiManager.updateStartPauseButton(true, this.state.isPaused);
        }
    }

    startGame() {
        this.state.isGameActive = true;
        this.state.showStartScreen = false;
        this.ball.start();
        this.uiManager.updateStartPauseButton(true, false);
    }

    canInteract() {
        return this.state.isGameActive && !this.state.isPaused && !this.state.showStartScreen;
    }

    movePaddle(mouseX) {
        this.paddle.moveTo(mouseX - this.paddle.width / 2);
    }

    update() {
        if (!this.canInteract() || this.state.isGameOver) return;

        this.ball.move();
        this.checkCollisions();
    }

    checkCollisions() {
        // Стены
        const wallCollisions = this.collisionSystem.detectBallWalls(
            this.ball, this.canvas.width, this.canvas.height
        );
        
        wallCollisions.forEach(collision => {
            if (collision.side === 'left' || collision.side === 'right') {
                this.ball.bounceX();
            } else if (collision.side === 'top') {
                this.ball.bounceY();
            } else if (collision.side === 'bottom') {
                this.handleBallMiss();
            }
        });

        // Платформа
        if (this.collisionSystem.detectBallPaddle(this.ball, this.paddle)) {
            this.ball.bounceY();
            this.soundManager.play('tap');
        }

        // Кирпичи
        this.bricks.forEach(brick => {
            const collision = this.collisionSystem.detectBallBrick(this.ball, brick);
            if (collision) {
                const resolution = this.collisionSystem.resolveCollision(collision);
                
                if (resolution.type === 'bounceX') {
                    this.ball.bounceX();
                } else {
                    this.ball.bounceY();
                }
                
                this.soundManager.play('tap');
                
                if (brick.hit(this.ball.damage)) {
                    this.state.addScore(brick.points);
                    this.uiManager.updateScore(this.state.score);
                }
            }
        });

        // Проверка завершения уровня
        if (!this.state.levelCompleted && this.levelManager.isLevelComplete(this.bricks)) {
            this.handleLevelComplete();
        }
    }

    handleBallMiss() {
        this.state.decreaseLife();
        this.uiManager.updateLives(this.state.lives);
        this.soundManager.play('lose');
        
        if (this.state.lives === 0) {
            this.handleGameOver();
        } else {
            this.resetBall();
            this.ball.start();
        }
    }

    handleLevelComplete() {
        this.state.levelCompleted = true;
        this.soundManager.play('win');
        
        setTimeout(() => {
            if (this.state.nextLevel()) {
                alert(`Level ${this.state.currentLevel - 1} complete! Moving to level ${this.state.currentLevel}!`);
                this.loadLevel(this.state.currentLevel);
                this.resetBall();
                this.ball.start();
                this.uiManager.updateLevel(this.state.currentLevel);
            } else {
                alert('YOU WIN! Congratulations!');
                this.restart();
            }
        }, 100);
    }

    handleGameOver() {
        this.state.isGameOver = true;
        
        setTimeout(() => {
            alert('Game Over! Restarting from level 1...');
            this.restart();
        }, 100);
    }

    restart() {
        this.state.reset();
        this.resetBall();
        this.loadLevel(1);
        this.uiManager.updateScore(0);
        this.uiManager.updateLives(3);
        this.uiManager.updateLevel(1);
        this.uiManager.updateStartPauseButton(false, false);
    }

    draw() {
        this.renderer.drawGame({
            ball: this.ball,
            paddle: this.paddle,
            bricks: this.bricks,
            currentLevel: this.state.currentLevel
        });

        // Отрисовка экранов (можно вынести в отдельный ScreenManager)
        if (this.state.showStartScreen) {
            this.drawStartScreen();
        } else if (this.state.isPaused) {
            this.drawPauseScreen();
        }
    }
    //Эти два экрана в отдельный класс вынесем!!
    drawStartScreen() { 
        const ctx = this.renderer.ctx;
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = 'bold 28px Arial';
        ctx.fillText('🚀 ARKANOID', this.canvas.width / 2 - 100, this.canvas.height / 2 - 40);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = "#96c93d";
        ctx.fillText('▶ START', this.canvas.width / 2 - 55, this.canvas.height / 2 + 20);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = "#ffffff";
        ctx.fillText('Click button or press SPACE', this.canvas.width / 2 - 100, this.canvas.height / 2 + 70);
    }

    drawPauseScreen() {
        const ctx = this.renderer.ctx;
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = 'bold 24px Arial';
        ctx.fillText('⏸ PAUSED', this.canvas.width / 2 - 70, this.canvas.height / 2 - 20);
        
        ctx.font = '16px Arial';
        ctx.fillText('Press SPACE or click RESUME', this.canvas.width / 2 - 110, this.canvas.height / 2 + 20);
    }
    //
    gameLoop = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop);
    }

    start() {
        this.gameLoop();
    }
}