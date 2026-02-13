// core/config.js
export const CONFIG = {
    BALL: {
        RADIUS: 10,
        DEFAULT_SPEED: 4,
        TYPES: {
            NORMAL: { 
                damage: 1, 
                speed: 4, 
                color: '#0095DD',
                name: 'Обычный'
            },
            FAST: { 
                damage: 1, 
                speed: 6, 
                color: '#ff5555',
                name: 'Быстрый'
            },
            POWER: { 
                damage: 2, 
                speed: 3, 
                color: '#ffaa00',
                name: 'Силовой'
            }
        }
    },
    
    PADDLE: {
        WIDTH: 75,
        HEIGHT: 10,
        TYPES: {
            NORMAL: { 
                width: 75, 
                color: '#0095DD',
                name: 'Обычная'
            },
            LONG: { 
                width: 100, 
                color: '#44aa44',
                name: 'Длинная'
            },
            SHORT: { 
                width: 50, 
                color: '#ff5555',
                name: 'Короткая'
            }
        }
    },
    
    BRICK: {
        WIDTH: 75,
        HEIGHT: 20,
        PADDING: 10,
        OFFSET: 30,
        
        // Настройки яркости для всех типов кирпичей
        LIGHTNESS: {
            MIN: 25,  // минимальная яркость (темный, полный HP)
            MAX: 75   // максимальная яркость (светлый, 1 HP)
        },
        
        TYPES: {
            WOOD: { 
                hp: 2, 
                points: 50, 
                hue: 30,        // коричнево-оранжевый
                saturation: 70,
                name: 'Дерево',
                description: 'Хрупкое дерево'
            },
            STONE: { 
                hp: 3, 
                points: 100, 
                hue: 0,         // серый (нейтральный)
                saturation: 10,
                name: 'Камень',
                description: 'Прочный камень'
            },
            IRON: { 
                hp: 4, 
                points: 150, 
                hue: 200,       // сине-серый
                saturation: 30,
                name: 'Железо',
                description: 'Металлический сплав'
            },
            GOLD: { 
                hp: 5, 
                points: 300, 
                hue: 50,        // золотисто-желтый
                saturation: 85,
                name: 'Золото',
                description: 'Драгоценный металл'
            },
            DIAMOND: { 
                hp: 6, 
                points: 500, 
                hue: 180,       // голубой
                saturation: 80,
                name: 'Алмаз',
                description: 'Самый прочный материал'
            }
        }
    },
    
    LEVELS: {
        1: { 
            rows: 5, 
            columns: 2, 
            name: 'Лесной уровень',
            description: 'Деревянные кирпичи',
            availableTypes: ['WOOD']
        },
        2: { 
            rows: 5, 
            columns: 3, 
            name: 'Горный уровень',
            description: 'Каменные кирпичи',
            availableTypes: ['WOOD', 'STONE']
        },
        3: { 
            rows: 5, 
            columns: 4, 
            name: 'Шахта',
            description: 'Железные кирпичи',
            availableTypes: ['STONE', 'IRON']
        },
        4: { 
            rows: 5, 
            columns: 5, 
            name: 'Сокровищница',
            description: 'Золотые и алмазные кирпичи',
            availableTypes: ['IRON', 'GOLD', 'DIAMOND']
        }
    },
    
    SCREEN: {
        WIDTH: 480,
        HEIGHT: 320
    },
    
    // Общие настройки игры
    GAME: {
        INITIAL_LIVES: 3,
        POINTS_PER_BRICK: 100,
        LEVEL_COMPLETE_DELAY: 100,
        GAME_OVER_DELAY: 100
    }
};