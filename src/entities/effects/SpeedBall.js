import { Effect } from '../Effect.js';

export class SpeedBallEffect extends Effect {
    constructor(ball, defaultValue) {
        super('SPEED', ball);
        this.totalDuration = 3000;
        this.originalSpeed = ball.speed;
        this.originalDx = ball.dx;
        this.originalDy = ball.dy;
        this.originalColor = ball.color
        this.defaultColor = defaultValue.color
        this.defaultSpeed = defaultValue.speed
    }

    onApply() {
        this.target.speed = this.originalSpeed * 1.5;
        this.target.color = "#FF0000"
        // Обновляем компоненты скорости, сохраняя направление
        const directionX = Math.sign(this.target.dx);
        const directionY = Math.sign(this.target.dy);
        this.target.dx = directionX * this.target.speed;
        this.target.dy = directionY * this.target.speed;
    }

    onExpire() {
        this.target.color = this.defaultColor
        this.target.speed = this.defaultSpeed;
        const directionX = Math.sign(this.target.dx);
        const directionY = Math.sign(this.target.dy);
        this.target.dx = directionX * this.target.speed;
        this.target.dy = directionY * this.target.speed;
    }
}