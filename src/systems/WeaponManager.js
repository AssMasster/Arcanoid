// systems/WeaponManager.js
import { LaserProjectile } from '../entities/projectiles/LaserProjectile.js';
import { RocketProjectile } from '../entities/projectiles/RocketProjectile.js';
import { ActiveWeaponMode } from '../entities/ActiveWeaponMode.js';
import { CONFIG } from '../core/config.js';

export class WeaponManager {
    constructor(game) {
        this.game = game;
        this.activeModes = [];    // активные способности (например, лазерный режим)
        this.projectiles = [];     // все снаряды на экране
    }

    // Активировать оружие (вызывается из EffectManager)
    activateWeapon(type) {
        const config = CONFIG.WEAPONS[type]; // читаем из конфига
        if (!config) return;
        const mode = new ActiveWeaponMode(type, config);
        this.activeModes.push(mode);
    }

    // Добавить конкретный снаряд (используется ActiveWeaponMode)
    addProjectile(type, x, y) {
        let projectile;
        switch (type) {
            case 'LASER':
                projectile = new LaserProjectile(x, y);
                break;
            case 'ROCKET':
                projectile = new RocketProjectile(x, y);
                break;
            // другие типы
            default:
                return;
        }
        this.projectiles.push(projectile);
    }

    // Обновление всех снарядов и активных режимов
    update(deltaTime) {
        // 1. Обновляем снаряды
        this.projectiles = this.projectiles.filter(p => {
            p.move();
            // Проверка столкновений с кирпичами
            let hit = false;
            this.game.bricks.forEach(brick => {
                if (!hit && p.checkCollision(brick)) {
                    if (brick.hit(p.damage)) {
                        this.game.state.addScore(brick.points);
                        this.game.uiManager.updateScore(this.game.state.score);
                    }
                    hit = true;
                }
            });
            return !hit && p.isActive;
        });

        // 2. Обновляем активные режимы
        this.activeModes = this.activeModes.filter(mode => 
            mode.update(deltaTime, this, this.game)
        );
    }

    // Очистка при рестарте
    clear() {
        this.activeModes = [];
        this.projectiles = [];
    }
}