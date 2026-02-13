import { CONFIG } from '../core/config.js';

export class Ball {
    constructor(type = 'POWER', x, y) {
        this.type = type;
        this.config = CONFIG.BALL.TYPES[type];
        this.radius = CONFIG.BALL.RADIUS;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.damage = this.config.damage;
        this.speed = this.config.speed;
        this.color = this.config.color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setDirection(dx, dy) {
        this.dx = dx * this.speed;
        this.dy = dy * this.speed;
    }

    start() {
        this.setDirection(1, -1);
    }

    stop() {
        this.dx = 0;
        this.dy = 0;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    bounceX() {
        this.dx = -this.dx;
    }

    bounceY() {
        this.dy = -this.dy;
    }

    getBounds() {
        return {
            left: this.x - this.radius,
            right: this.x + this.radius,
            top: this.y - this.radius,
            bottom: this.y + this.radius
        };
    }
}