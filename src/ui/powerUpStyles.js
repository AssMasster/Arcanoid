export const POWER_UP_STYLES = {
    EXPAND: {
        color: '#00ff00',
        symbol: '⇔',
        symbolColor: '#ffffff',
        description: 'Расширение платформы',
    },
    SPEED: {
        color: '#ff8800',
        symbol: '⚡',
        symbolColor: '#ffff00',
        description: 'Ускорение мяча',
    },
    DAMAGE: {
        color: '#ff0000',
        symbol: '⚔️',
        symbolColor: '#ffffff',
        description: 'Урон шара',
    },
    LASER: {
        color: '#ff00ff',
        symbol: '⚡',
        symbolColor: '#ffffff',
        description: 'Лазерные пушки',
    },
    ROCKET: {
        color: '#ffaa00',
        symbol: '🚀',
        symbolColor: '#ffffff',
        description: 'Ракеты',
    },
};

// Функция для получения стиля по типу (с защитой)
export const getPowerUpStyle = (type) => {
    return POWER_UP_STYLES[type] || {
        color: '#cccccc',
        symbol: '?',
        symbolColor: '#ffffff',
        description: 'Неизвестный бонус',
    };
};