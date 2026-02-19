import { Projectile } from './Projectile.js';

export class LaserProjectile extends Projectile {
    constructor(x, y) {
        super(x, y, 'LASER');
        this.color = '#ff00f2';
        this.width = 3;
        this.height = 15;
        this.speed = 10;
        this.damage = 1;
    }
}