import { CONFIG } from '../core/config.js';
import { Brick } from '../entities/Brick.js';

export class LevelManager {
    constructor() {
        this.levels = CONFIG.LEVELS;
        this.currentLevel = 1;
    }

    createLevel(levelNumber) {
        const level = this.levels[levelNumber];
        const bricks = [];
        const brickTypes = level.availableTypes;
        
        for (let c = 0; c < level.columns; c++) {
            for (let r = 0; r < level.rows; r++) {
                const randomType = brickTypes[Math.floor(Math.random() * brickTypes.length)];
                const x = r * (CONFIG.BRICK.WIDTH + CONFIG.BRICK.PADDING) + CONFIG.BRICK.OFFSET;
                const y = c * (CONFIG.BRICK.HEIGHT + CONFIG.BRICK.PADDING) + CONFIG.BRICK.OFFSET;
                
                bricks.push(new Brick(randomType, r, c, x, y));
            }
        }
        
        return bricks;
    }

    isLevelComplete(bricks) {
        return bricks.every(brick => brick.hp <= 0);
    }
}