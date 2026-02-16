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
    MULTI: {
        color: '#ff00ff',
        symbol: '3',
        symbolColor: '#ffffff',
        description: 'Мульти мяч',

    },
    LIFE: {
        color: '#ff5555',
        symbol: '❤️',
        symbolColor: '#ffffff',
        description: 'Дополнительная жизнь',

    },
    SHRINK: {
        color: '#ff0000',
        symbol: '⇒⇐',
        symbolColor: '#ffffff',
        description: 'Сужение платформы',

    }
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