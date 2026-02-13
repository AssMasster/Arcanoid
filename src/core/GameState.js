import { CONFIG } from './config.js';
export class GameState {
    constructor() {
        this.lives = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.maxLevel = Object.keys(CONFIG.LEVELS).length;
        this.isPaused = false;
        this.isGameActive = false;
        this.isGameOver = false;
        this.showStartScreen = true;
        this.levelCompleted = false;
    }

    reset() {
        this.lives = 3;
        this.score = 0;
        this.currentLevel = 1;
        this.isPaused = false;
        this.isGameActive = false;
        this.isGameOver = false;
        this.showStartScreen = true;
        this.levelCompleted = false;
    }

    decreaseLife() {
        this.lives = Math.max(0, this.lives - 1);
        return this.lives;
    }

    addScore(points) {
        this.score += points;
    }

    nextLevel() {
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            this.levelCompleted = false;
            return true;
        }
        return false;
    }
}