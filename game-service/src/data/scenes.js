// TODO: Пока храним сцены в файле. Потом перенесем в БД.

export const scenes = [
  {
    id: 'intro',
    title: 'Начало пути',
    text: 'Ты стоишь у ворот древнего города. Перед тобой начинается путь к разгадке кода Рюрика.',
    score: 100,
    choices: [
      {
        id: 'go_to_market',
        text: 'Пойти на торговую площадь',
        nextSceneId: 'market',
        score: 50
      },
      {
        id: 'go_to_forest',
        text: 'Пойти к лесной дороге',
        nextSceneId: 'forest',
        score: 30
      }
    ]
  },
  {
    id: 'market',
    title: 'Торговая площадь',
    text: 'На площади шумно. Купец рассказывает легенду о тайном знаке на старой монете.',
    score: 150,
    choices: [
      {
        id: 'ask_merchant',
        text: 'Расспросить купца',
        nextSceneId: 'rune',
        score: 80
      },
      {
        id: 'return_intro',
        text: 'Вернуться к воротам',
        nextSceneId: 'intro',
        score: 0
      }
    ]
  },
  {
    id: 'forest',
    title: 'Лесная дорога',
    text: 'В лесу тихо. На старом камне ты замечаешь странный символ.',
    score: 120,
    choices: [
      {
        id: 'inspect_symbol',
        text: 'Осмотреть символ',
        nextSceneId: 'rune',
        score: 100
      },
      {
        id: 'return_intro',
        text: 'Вернуться к воротам',
        nextSceneId: 'intro',
        score: 0
      }
    ]
  },
  {
    id: 'rune',
    title: 'Знак Рюрика',
    text: 'Ты находишь первый ключ к разгадке. Кажется, это только начало большой истории.',
    score: 300,
    isFinal: true,
    choices: []
  }
];