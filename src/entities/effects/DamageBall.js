import { Effect } from '../Effect.js';

export class DamageBallEffect extends Effect {
    constructor(ball, defaultValue) {
        super('SPEED', ball);
        this.totalDuration = 7000;
        this.originalDamage = ball.damage
        this.defaultDamage = defaultValue.damage
        this.originalColor = ball.color
        this.defaultColor = defaultValue.color
    }

    onApply() {
        this.target.damage = this.originalDamage + this.defaultDamage 
        this.target.color = "#FF0000"
    }

    onExpire() {
        this.target.color = this.defaultColor
        if (this.originalDamage === this.defaultDamage) {
            this.target.damage = this.defaultDamage
        } else {
            this.target.damage = this.originalDamage - this.defaultDamage;
        }
    }
}