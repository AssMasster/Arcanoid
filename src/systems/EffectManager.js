import { ExpandPaddleEffect } from '../entities/effects/ExpandPaddle.js';
import { SpeedBallEffect } from '../entities/effects/SpeedBall.js';
// Импортируйте другие эффекты по мере добавления

export class EffectManager {
    constructor(game) {
        this.game = game; // ссылка на игру для доступа к объектам
        this.effects = [];
    }

    addEffect(powerUpType) {
        console.log(`✨ Добавлен эффект типа: ${powerUpType}`);
        
        let effect = null;
        
        // Создаем соответствующий эффект на основе типа бонуса
        switch (powerUpType) {
            case 'EXPAND':
                effect = new ExpandPaddleEffect(this.game.paddle, this.game.default.paddle);
                break;
            case 'SPEED':
                effect = new SpeedBallEffect(this.game.ball, this.game.default.ball);
                break;
            // Добавляйте новые типы здесь
            default:
                console.warn(`Неизвестный тип эффекта: ${powerUpType}`);
                return null;
        }
        
        if (effect) {
            effect.onApply();
            this.effects.push(effect);
        }
        
        return effect;
    }

    updateEffects(deltaTime) {
        // Обновляем все эффекты и удаляем завершенные
        this.effects = this.effects.filter(effect => {
            effect.execute(deltaTime);
            return effect.isActive;
        });
    }

    clearEffects() {
        // Сбрасываем все активные эффекты
        this.effects.forEach(effect => {
            if (effect.onExpire) effect.onExpire();
        });
        this.effects = [];
    }
}