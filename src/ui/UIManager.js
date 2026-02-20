export class UIManager {
    constructor() {
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.livesDisplay = document.getElementById('livesDisplay');
        this.levelDisplay = document.getElementById('levelDisplay');
        this.startPauseBtn = document.getElementById('startPauseBtn');
        this.recordDisplay = document.getElementById('recordDisplay');
    }

    updateRecord (record) {
        if (this.recordDisplay) {
            this.recordDisplay.textContent = record
        }
    }

    updateScore(score) {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = score;
            this.highlight(this.scoreDisplay, 'highlight-score');
        }
    }

    updateLives(lives) {
        if (this.livesDisplay) {
            this.livesDisplay.textContent = lives;
            this.highlight(this.livesDisplay, 'highlight-lives');
        }
    }

    updateLevel(level) {
        if (this.levelDisplay) {
            this.levelDisplay.textContent = level;
        }
    }

    updateStartPauseButton(isGameActive, isPaused) {
        if (!this.startPauseBtn) return;
        
        if (!isGameActive) {
            this.startPauseBtn.textContent = '▶ START';
            this.startPauseBtn.classList.remove('paused');
        } else if (isPaused) {
            this.startPauseBtn.textContent = '▶ RESUME';
            this.startPauseBtn.classList.remove('paused');
        } else {
            this.startPauseBtn.textContent = '⏸ PAUSE';
            this.startPauseBtn.classList.add('paused');
        }
    }

    highlight(element, className) {
        element.classList.add(className);
        setTimeout(() => element.classList.remove(className), 200);
    }
}