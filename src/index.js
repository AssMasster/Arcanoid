import { Game } from './core/Game.js';

const canvas = document.querySelector('#arkanoid');
const game = new Game(canvas);
game.start();