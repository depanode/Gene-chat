module.exports = [
    {
        name: 'Echo Bot',
        online: true,
        avatar: '1.jpg',
        messageHandler: 'echo',
        standAlone: false,
        description: 'На любое сообщение отвечает этим же сообщением.'
    },
    {
        name: 'Reverse Bot',
        online: false,
        avatar: '2.jpg',
        messageHandler: 'reverse',
        standAlone: false,
        description: 'На любое сообщение отвечает этим же сообщением, но перевернутым.'
    },
    {
        name: 'Spam Bot',
        online: true,
        avatar: '3.png',
        messageHandler: 'spam',
        standAlone: true,
        description: 'Игнорирует все, что ему пишешь. Раз в 10-120 секунд (величина случайная) пишет что-то в чат.'
    },
    {
        name: 'Ignore Bot',
        online: true,
        avatar: '4.png',
        messageHandler: 'ignore',
        standAlone: false,
        description: 'Просто все игнорирует, ничего не пишет.'
    },
    {
        name: 'Random Bot',
        online: false,
        avatar: '5.gif',
        messageHandler: 'random',
        standAlone: false,
        description: 'На каждое сообщение отвечает случайным сообщением из базы.'
    }
];