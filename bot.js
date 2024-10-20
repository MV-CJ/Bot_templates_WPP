const { initializeQRCode } = require('./components/Connections/QRCode');
const { handleConnection } = require('./components/Connections/Connection');
const sendMenu = require('./components/Menu/Menu').default;
const sendWelcome = require('./components/Messages/Welcome').default;

//Opções do menu
const sendCatalog = require('./components/Services/catalog').default;
const connectWithSalesSpecialist = require('./components/Services/salesSpecialist').default;
const sendTechSupport = require('./components/Services/techSupport').default;
const sendAIRecommendation = require('./components/Services/aiRecommendation').default;
const handleExit = require('./components/Services/exit').default;

async function startBot() {
    // Inicializa o QR Code e o estado de autenticação
    const { state, saveCreds } = await initializeQRCode();

    // Estabelece a conexão usando o estado de autenticação
    const sock = await handleConnection(state, saveCreds);

    // Função para lidar com mensagens recebidas
    sock.ev.on('messages.upsert', async (m) => {
        console.log('Mensagem recebida', m);
        
        const msg = m.messages[0];
        if (!msg.message) return;

        const sender = msg.key.remoteJid;        
        // Realiza a extração de texto da mensagem recebida para trata-lá corretamente (Mensagens extendidas ou simples)
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase();
        
        if (!text) return;
        
        // Exibe boas-vindas e menu na primeira interação
        if (text === 'menu') {
            await sendWelcome(sock, sender);
            await sendMenu(sock, sender);
        } else {
            // Processa a escolha do menu
            await processMenuSelection(sock, sender, text);
        }
    });
}

// Função para processar as opções do menu
const processMenuSelection = async (sock, sender, text) => {
    switch (text.trim()) {
        case '1':
            await sendCatalog(sock, sender);
            break;
        case '2':
            await connectWithSalesSpecialist(sock, sender);
            break;
        case '3':
            await sendTechSupport(sock, sender);
            break;
        case '4':
            await sendAIRecommendation(sock, sender);
            break;
        case '5':
            await handleExit(sock, sender);
            break;
        default:
            // Resposta para escolha inválida
            await sock.sendMessage(sender, { text: '🤖 Desculpe, não entendi sua escolha. Por favor, selecione uma opção válida.' });
            await sendMenu(sock, sender);
            break;
    }
}

startBot();
