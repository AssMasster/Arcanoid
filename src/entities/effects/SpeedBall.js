import { Effect } from '../Effect.js';

export class SpeedBallEffect extends Effect {
    constructor(ball, defaultValue) {
        super('SPEED', ball);
        this.totalDuration = 5000;
        this.originalSpeed = ball.speed;
        this.originalDx = ball.dx;
        this.originalDy = ball.dy;
        this.originalColor = ball.color
        this.defaultColor = defaultValue.color
        this.defaultSpeed = defaultValue.speed
    }

    onApply() {
        this.target.speed = this.originalSpeed + this.defaultSpeed * 0.5;
        this.target.color = "#FFDD00"
        // Обновляем компоненты скорости, сохраняя направление
        const directionX = Math.sign(this.target.dx);
        const directionY = Math.sign(this.target.dy);
        this.target.dx = directionX * this.target.speed;
        this.target.dy = directionY * this.target.speed;
    }

    onExpire() {
        this.target.color = this.defaultColor
        if (this.originalSpeed === this.defaultSpeed) {
            this.target.speed = this.defaultSpeed
        } else {
            this.target.speed = this.originalSpeed - this.defaultSpeed;
        }
        const directionX = Math.sign(this.target.dx);
        const directionY = Math.sign(this.target.dy);
        this.target.dx = directionX * this.target.speed;
        this.target.dy = directionY * this.target.speed;
    }
}