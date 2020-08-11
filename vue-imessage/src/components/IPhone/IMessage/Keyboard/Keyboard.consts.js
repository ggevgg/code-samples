const uppercase = [
  [
    {key: 'Q', type: 'white'},
    {key: 'W', type: 'white'},
    {key: 'E', type: 'white'},
    {key: 'R', type: 'white'},
    {key: 'T', type: 'white'},
    {key: 'Y', type: 'white'},
    {key: 'U', type: 'white'},
    {key: 'I', type: 'white'},
    {key: 'O', type: 'white'},
    {key: 'P', type: 'white'}
  ], [
    {key: 'A', type: 'white'},
    {key: 'S', type: 'white'},
    {key: 'D', type: 'white'},
    {key: 'F', type: 'white'},
    {key: 'G', type: 'white'},
    {key: 'H', type: 'white'},
    {key: 'J', type: 'white'},
    {key: 'K', type: 'white'},
    {key: 'L', type: 'white'}
  ], [
    {key: '⬆', type: 'gray', popout: false,},
    {key: 'Z', type: 'white'},
    {key: 'X', type: 'white'},
    {key: 'C', type: 'white'},
    {key: 'V', type: 'white'},
    {key: 'B', type: 'white'},
    {key: 'N', type: 'white'},
    {key: 'M', type: 'white'},
    {key: '⌫', type: 'gray', popout: false,}
  ], [
    {key: '123', type: 'gray', popout: false,},
    {key: 'space', type: 'white', popout: false, code: ' '},
    {key: 'return', type: 'gray', popout: false, code: 'Enter'}
  ],
]

const lowcase = [
  [
    {key: 'q', type: 'white'},
    {key: 'w', type: 'white'},
    {key: 'e', type: 'white'},
    {key: 'r', type: 'white'},
    {key: 't', type: 'white'},
    {key: 'y', type: 'white'},
    {key: 'u', type: 'white'},
    {key: 'i', type: 'white'},
    {key: 'o', type: 'white'},
    {key: 'p', type: 'white'}
  ], [
    {key: 'a', type: 'white'},
    {key: 's', type: 'white'},
    {key: 'd', type: 'white'},
    {key: 'f', type: 'white'},
    {key: 'g', type: 'white'},
    {key: 'h', type: 'white'},
    {key: 'j', type: 'white'},
    {key: 'k', type: 'white'},
    {key: 'l', type: 'white'}
  ], [
    {key: '⇧', type: 'gray', popout: false,},
    {key: 'z', type: 'white'},
    {key: 'x', type: 'white'},
    {key: 'c', type: 'white'},
    {key: 'v', type: 'white'},
    {key: 'b', type: 'white'},
    {key: 'n', type: 'white'},
    {key: 'm', type: 'white'},
    {key: '⌫', type: 'gray', popout: false,}
  ], [
    {key: '123', type: 'gray', popout: false,},
    {key: 'space', type: 'white', popout: false, code: ' '},
    {key: 'return', type: 'gray', popout: false, code: 'Enter'}
  ],
]

const numbers = [
  [
    {key: '1', type: 'white'},
    {key: '2', type: 'white'},
    {key: '3', type: 'white'},
    {key: '4', type: 'white'},
    {key: '5', type: 'white'},
    {key: '6', type: 'white'},
    {key: '7', type: 'white'},
    {key: '8', type: 'white'},
    {key: '9', type: 'white'},
    {key: '0', type: 'white'}
  ], [
    {key: '-', type: 'white'},
    {key: '/', type: 'white'},
    {key: ':', type: 'white'},
    {key: ';', type: 'white'},
    {key: '(', type: 'white'},
    {key: ')', type: 'white'},
    {key: '$', type: 'white'},
    {key: '&', type: 'white'},
    {key: '@', type: 'white'},
    {key: '~', type: 'white'}
  ], [
    {key: '#+=', type: 'gray', small: true},
    {key: '.', type: 'white', wide: true},
    {key: ',', type: 'white', wide: true},
    {key: '?', type: 'white', wide: true},
    {key: '!', type: 'white', wide: true},
    {key: '\'', type: 'white', wide: true},
    {key: '⌫', type: 'gray', popout: false,}
  ], [
    {key: 'ABC', type: 'gray', popout: false,},
    {key: 'space', type: 'white', popout: false, code: ' '},
    {key: 'return', type: 'gray', popout: false, code: 'Enter'}
  ]
]

const symbols = [
  [
    {key: '[', type: 'white'},
    {key: ']', type: 'white'},
    {key: '{', type: 'white'},
    {key: '}', type: 'white'},
    {key: '#', type: 'white'},
    {key: '%', type: 'white'},
    {key: '^', type: 'white'},
    {key: '*', type: 'white'},
    {key: '+', type: 'white'},
    {key: '=', type: 'white'}
  ], [
    {key: '_', type: 'white'},
    {key: '\\', type: 'white'},
    {key: '|', type: 'white'},
    {key: '~', type: 'white'},
    {key: '<', type: 'white'},
    {key: '>', type: 'white'},
    {key: '€', type: 'white'},
    {key: '£', type: 'white'},
    {key: '¥', type: 'white'},
    {key: '•', type: 'white'}
  ], [
    {key: '123', type: 'gray', size: -1},
    {key: '.', type: 'white', size: 1},
    {key: ',', type: 'white', size: 1},
    {key: '?', type: 'white', size: 1},
    {key: '!', type: 'white', size: 1},
    {key: '\'', type: 'white', size: 1},
    {key: '⌫', type: 'gray', popout: false,}
  ], [
    {key: 'ABC', type: 'gray', popout: false,},
    {key: 'space', type: 'white', popout: false, code: ' '},
    {key: 'return', type: 'gray', popout: false, code: 'Enter'}
  ]
]

const uppercase_ru = [
  [
    {key: 'Й', type: 'white', size: -2},
    {key: 'Ц', type: 'white', size: -2},
    {key: 'У', type: 'white', size: -2},
    {key: 'К', type: 'white', size: -2},
    {key: 'Е', type: 'white', size: -2},
    {key: 'Н', type: 'white', size: -2},
    {key: 'Г', type: 'white', size: -2},
    {key: 'Ш', type: 'white', size: -2},
    {key: 'Щ', type: 'white', size: -2},
    {key: 'З', type: 'white', size: -2},
    {key: 'Х', type: 'white', size: -2}
  ], [
    {key: 'Ф', type: 'white', size: -2},
    {key: 'Ы', type: 'white', size: -2},
    {key: 'В', type: 'white', size: -2},
    {key: 'А', type: 'white', size: -2},
    {key: 'П', type: 'white', size: -2},
    {key: 'Р', type: 'white', size: -2},
    {key: 'О', type: 'white', size: -2},
    {key: 'Л', type: 'white', size: -2},
    {key: 'Д', type: 'white', size: -2},
    {key: 'Ж', type: 'white', size: -2},
    {key: 'Э', type: 'white', size: -2}
  ], [
    {key: '⬆', type: 'gray', size: -2},
    {key: 'Я', type: 'white', size: -2},
    {key: 'Ч', type: 'white', size: -2},
    {key: 'С', type: 'white', size: -2},
    {key: 'М', type: 'white', size: -2},
    {key: 'И', type: 'white', size: -2},
    {key: 'Т', type: 'white', size: -2},
    {key: 'Ь', type: 'white', size: -2},
    {key: 'Б', type: 'white', size: -2},
    {key: 'Ю', type: 'white', size: -2},
    {key: '⌫', type: 'gray', popout: false, size: -2}
  ], [
    {key: '123', type: 'gray', popout: false,},
    {key: 'Пробел', type: 'white', popout: false, code: ' '},
    {key: 'Ввод', type: 'gray', popout: false, code: 'Enter'}
  ],
]

const lowcase_ru = [
  [
    {key: 'й', type: 'white', size: -2},
    {key: 'ц', type: 'white', size: -2},
    {key: 'у', type: 'white', size: -2},
    {key: 'к', type: 'white', size: -2},
    {key: 'е', type: 'white', size: -2},
    {key: 'н', type: 'white', size: -2},
    {key: 'г', type: 'white', size: -2},
    {key: 'ш', type: 'white', size: -2},
    {key: 'щ', type: 'white', size: -2},
    {key: 'з', type: 'white', size: -2},
    {key: 'х', type: 'white', size: -2}
  ], [
    {key: 'ф', type: 'white', size: -2},
    {key: 'ы', type: 'white', size: -2},
    {key: 'в', type: 'white', size: -2},
    {key: 'а', type: 'white', size: -2},
    {key: 'п', type: 'white', size: -2},
    {key: 'р', type: 'white', size: -2},
    {key: 'о', type: 'white', size: -2},
    {key: 'л', type: 'white', size: -2},
    {key: 'д', type: 'white', size: -2},
    {key: 'ж', type: 'white', size: -2},
    {key: 'э', type: 'white', size: -2}
  ], [
    {key: '⬆', type: 'gray', size: -2, popout: false,},
    {key: 'я', type: 'white', size: -2},
    {key: 'ч', type: 'white', size: -2},
    {key: 'с', type: 'white', size: -2},
    {key: 'м', type: 'white', size: -2},
    {key: 'и', type: 'white', size: -2},
    {key: 'т', type: 'white', size: -2},
    {key: 'ь', type: 'white', size: -2},
    {key: 'б', type: 'white', size: -2},
    {key: 'ю', type: 'white', size: -2},
    {key: '⌫', type: 'gray', size: -2, popout: false,}
  ], [
    {key: '123', type: 'gray', popout: false,},
    {key: 'Пробел', type: 'white', popout: false, code: ' '},
    {key: 'Ввод', type: 'gray', popout: false, code: 'Enter'}
  ],
]

export default {
  uppercase,
  lowcase,
  numbers,
  symbols,
  uppercase_ru,
  lowcase_ru
};
