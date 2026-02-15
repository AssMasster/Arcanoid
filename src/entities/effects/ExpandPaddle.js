import { Effect } from '../Effect.js';

export class ExpandPaddleEffect extends Effect {
    constructor(paddle, defaultValue) {
        super('EXPAND', paddle);
        this.totalDuration = 5000;
        this.originalWidth = paddle.width;
        this.defaultValue = defaultValue.width
    }

    onApply() {
        this.target.width = this.originalWidth + this.defaultValue * 0.5;
    }

    onExpire() {
        if (this.originalWidth === this.defaultValue) {
            this.target.width = this.defaultValue
        } else {
            this.target.width = this.originalWidth - this.defaultValue * 0.5;
        }
    }
}