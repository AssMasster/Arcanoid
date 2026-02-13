export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keydownHandler = this.handleKeyDown.bind(this);
        this.mousemoveHandler = this.handleMouseMove.bind(this);
        this.buttonClickHandler = this.handleButtonClick.bind(this);
        this.button = document.getElementById('startPauseBtn');
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('mousemove', this.mousemoveHandler);
        
        if (this.button) {
            this.button.addEventListener('click', this.buttonClickHandler);
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('mousemove', this.mousemoveHandler);
        
        if (this.button) {
            this.button.removeEventListener('click', this.buttonClickHandler);
        }
    }

    handleKeyDown(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            this.game.toggleStartPause();
        }
    }

    handleButtonClick(e) {
        e.preventDefault();
        this.game.toggleStartPause();
    }

    handleMouseMove(e) {
        if (!this.game.canInteract()) return;
        
        const rect = this.game.canvas.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        
        if (relativeX > 0 && relativeX < this.game.canvas.width) {
            this.game.movePaddle(relativeX);
        }
    }
}