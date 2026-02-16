import { getPowerUpStyle } from "../ui/powerUpStyles.js";

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground(level) {
        const levelColors = {
            1: 'rgba(0, 20, 0, 0.1)',
            2: 'rgba(0, 0, 30, 0.1)',
            3: 'rgba(30, 0, 0, 0.1)'
        };
        
        this.ctx.fillStyle = levelColors[level] || '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBall(ball) {
        this.ctx.fillStyle = ball.color;
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPaddle(paddle) {
        this.ctx.fillStyle = paddle.color;
        this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    drawBricks(bricks) {
        bricks.forEach(brick => {
            if (brick.isActive) {
                this.ctx.fillStyle = brick.color;
                this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
    }
    drawPowerUps(powerUps) {
        // Проверяем, что объект существует
        if (powerUps.length === 0) return;
        
        powerUps.forEach((powerUp) => {
            if (!powerUp.isActive) return
            const style = getPowerUpStyle(powerUp.type)
            this.ctx.beginPath();
            this.ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = style.color;
            this.ctx.fill();
            this.ctx.closePath();
            
            // Рисуем плюсик внутри
            this.ctx.fillStyle = style.symbolColor;
            this.ctx.font = `bold ${powerUp.radius}px Arial`;
            this.ctx.fillText(style.symbol, powerUp.x - 9, powerUp.y + 4);
        })
    }
    drawGame(state) {
        this.clear();
        this.drawBackground(state.currentLevel);
        this.drawBall(state.ball);
        this.drawPaddle(state.paddle);
        this.drawBricks(state.bricks);
        this.drawPowerUps(state.powerUps);
    }
}