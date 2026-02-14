export class Bullet {
    constructor(x, y, direction = 1) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 5;
        this.direction = direction;
        this.color = "#FF0000";
        this.isActive = true;
        this.damage = 1;
    }

    move() {
        this.y -= this.speed * this.direction; // летит вверх
        // Деактивируем, если улетела за экран
        if (this.y < 0) {
            this.isActive = false;
        }
    }

    getBounds() {
        return {
            left: this.x - this.width / 2,
            right: this.x + this.width / 2,
            top: this.y - this.height / 2,
            bottom: this.y + this.height / 2
        };
    }


}