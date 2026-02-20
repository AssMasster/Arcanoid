export class SoundManager {
    constructor() {
        this.sounds = {
            tap: new Audio('../../assets/tap.wav'),
            win: new Audio('../../assets/win.wav'),
            lose: new Audio('../../assets/lose.wav'),
            LASER: new Audio('../../assets/laser.mp3'),
            ROCKET: new Audio('../../assets/rocket.mp3')
        };
        this.isMuted = false;
    }

    play(soundName) {
        if (this.isMuted) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    }

    mute() {
        this.isMuted = true;
    }

    unmute() {
        this.isMuted = false;
    }
}