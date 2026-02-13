import { CONFIG } from '../core/config.js';

export class Paddle {
    constructor(type = 'NORMAL', canvasWidth) {
        this.type = type;
        this.config = CONFIG.PADDLE.TYPES[type];
        this.width = this.config.width;
        this.height = CONFIG.PADDLE.HEIGHT;
        this.color = this.config.color;
        this.canvasWidth = canvasWidth;
        this.x = (canvasWidth - this.width) / 2;
        this.y = 0; // будет установлен позже
    }

    setY(y) {
        this.y = y;
    }

    moveTo(x) {
        this.x = Math.max(0, Math.min(x, this.canvasWidth - this.width));
    }

    getBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}