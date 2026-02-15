import { CONFIG } from '../core/config.js';
import { PowerUp } from '../entities/PowerUp.js';

export class PowerUpManager {
    constructor () {
        this.spawnProbability = CONFIG.POWERUP.spawnProbability
        this.availableTypes = CONFIG.POWERUP.availableTypes
    }

    spawnPowerUp(origin) {
        if (Math.random() < this.spawnProbability) {
            console.log('spawn power')
            console.log(this.defineType())
            return new PowerUp(
                15,
                origin.x + origin.width / 2,
                origin.y + origin.height / 2,
                this.defineType()

            );
        }
        return null
    }

    defineType () {
        return this.availableTypes[Math.floor(Math.random() * this.availableTypes.length)]
    }
}