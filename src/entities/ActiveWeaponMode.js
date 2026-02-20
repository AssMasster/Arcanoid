export class ActiveWeaponMode {
    constructor(type, config) {
        this.type = type;
        this.shotsLeft = config.shots || 3;          // сколько раз выстрелить
        this.interval = config.interval || 1000;      // мс между выстрелами
        this.lastShotTime = performance.now();        // время последнего выстрела
        this.duration = config.duration || 5000;      // макс. время жизни
        this.startTime = performance.now();
    }

    // Вызывается каждый кадр из WeaponManager
    update(deltaTime, weaponManager, game) {
        const now = performance.now();
        
        // Проверка на время жизни
        if (now - this.startTime > this.duration) {
            return false; // удалить режим
        }

        // Проверка на количество выстрелов
        if (this.shotsLeft <= 0) {
            return false; // удалить режим
        }

        // Пора ли стрелять?
        if (now - this.lastShotTime >= this.interval) {
            this.shoot(weaponManager, game);
            this.lastShotTime = now;
            this.shotsLeft--;
        }
        return true; // оставить режим
    }

    shoot(weaponManager, game) {
        // Создаём снаряды в зависимости от типа
        game.soundManager.play(this.type)
        switch (this.type) {
            case 'LASER':
                // Два лазера с краёв платформы
                weaponManager.addProjectile('LASER', 
                    game.paddle.x + game.paddle.width * 0.2, 
                    game.paddle.y);
                weaponManager.addProjectile('LASER',
                    game.paddle.x + game.paddle.width * 0.8,
                    game.paddle.y);
                break;
            case 'ROCKET':
                // Ракета вылетает из центра платформы
                weaponManager.addProjectile('ROCKET',
                    game.paddle.x + game.paddle.width / 2,
                    game.paddle.y);
                break;
        }
    }
}