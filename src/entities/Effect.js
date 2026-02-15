// effects/Effect.js
export class Effect {
    constructor(type, target) {
        this.type = type;              // тип эффекта (совпадает с типом бонуса)
        this.target = target;          // объект, на который действует эффект (paddle, ball и т.д.)
        this.totalDuration = 0;         // общая длительность в мс
        this.currentDuration = 0;       // текущее время действия
        this.isActive = true;           
    }

    // Вызывается при активации эффекта
    onApply() {
        // Переопределяется в подклассах
    }

    // Вызывается каждый кадр
    execute(deltaTime) {
        this.currentDuration += deltaTime;
        if (this.currentDuration >= this.totalDuration) {
            this.onExpire();
            this.isActive = false;
        }
    }

    // Вызывается при завершении эффекта
    onExpire() {
        // Переопределяется в подклассах
    }
}