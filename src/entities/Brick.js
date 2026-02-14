import { CONFIG } from '../core/config.js';

export class Brick {
    constructor(type, row, col, x, y) {
        this.type = type;
        this.config = CONFIG.BRICK.TYPES[type];
        this.hp = this.config.hp;
        this.maxHp = this.config.hp;
        this.points = this.config.points;
        
        // HSL параметры для этого типа кирпича
        this.hue = this.config.hue;        // оттенок (0-360)
        this.saturation = this.config.saturation; // насыщенность (0-100)
        
        this.x = x;
        this.y = y;
        this.width = CONFIG.BRICK.WIDTH;
        this.height = CONFIG.BRICK.HEIGHT;
        this.row = row;
        this.col = col;
        this.isActive = true;
        
        this.updateColor(); // устанавливаем начальный цвет
    }

    hit(damage = 1) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.isActive = false;
            return true; // кирпич разрушен
        }
        this.updateColor(); // обновляем цвет после уменьшения hp
        return false;
    }

    updateColor() {
        const intensity = this.hp / this.maxHp;
        
        const minLightness = 20;
        const maxLightness = 80;  

        const lightness = minLightness + (1 - intensity) * (maxLightness - minLightness);

        this.color = `hsl(${this.hue}, ${this.saturation}%, ${Math.round(lightness)}%)`;
    }

    getBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}