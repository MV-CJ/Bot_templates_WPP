const { default: makeWASocket, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

async function handleConnection(state, saveCreds) {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Exibe o QR code no terminal
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada devido a', lastDisconnect.error, ', reconectando...', shouldReconnect);
            if (shouldReconnect) {
                handleConnection(state, saveCreds); // Reconeça se não for logout
            }
        } else if (connection === 'open') {
            console.log('Conectado com sucesso ao WhatsApp!');
        }
    });

    return sock;
}

module.exports = { handleConnection };
