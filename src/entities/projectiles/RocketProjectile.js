import { Projectile } from './Projectile.js';

export class RocketProjectile extends Projectile {
    constructor(x, y) {
        super(x, y, 'ROCKET');
        this.width = 8;
        this.height = 16;
        this.speed = 6;         
        this.damage = 4;          
        this.color = '#ffaa00'; 
        this.explosionRadius = 30; // радиус взрыва (опционально)
    }

    // Ракета может иметь хвост или особую отрисовку
    move() {
        super.move();
        // Можно добавить лёгкое покачивание для эффекта
        // this.x += Math.sin(Date.now() * 0.01) * 0.5;
    }

    // При попадании можно создать взрыв (дополнительная логика)
    onHit(brick) {
        // Например, нанести урон соседним кирпичам
        // Здесь можно реализовать взрывную волну
        console.log('💥 Ракета взорвалась!');
    }
}