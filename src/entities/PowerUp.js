export class PowerUp {
    constructor(radius, x, y) {
        this.radius = radius;
        this.x = x;             
        this.y = y;
        this.dy = 2;                   
        this.color = "#FFD700";     
        this.isActive = true;
    }

    move() {
        this.y += this.dy;             
    }

    colision () {
        this.isActive = false;
    }

    getBounds() {
        return {
            left: this.x - this.radius,
            right: this.x + this.radius,
            top: this.y - this.radius,
            bottom: this.y + this.radius
        };
    }
}