export class Projectile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 4;
        this.height = 10;
        this.speed = 8;
        this.damage = 1;
        this.isActive = true;
        this.color = '#ff0000';
    }

    move() {
        this.y -= this.speed;
        if (this.y < 0) this.isActive = false;
    }

    getBounds() {
        return {
            left: this.x - this.width/2,
            right: this.x + this.width/2,
            top: this.y - this.height,
            bottom: this.y
        };
    }

    checkCollision(brick) {
        if (!brick.isActive) return false;
        const b = this.getBounds();
        const br = brick.getBounds();
        return !(b.right < br.left || b.left > br.right || b.bottom < br.top || b.top > br.bottom);
    }
}