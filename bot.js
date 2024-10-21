const { initializeQRCode } = require('./components/Connections/QRCode');
const { handleConnection } = require('./components/Connections/Connection');
const sendMenu = require('./components/Menu/Menu').default;
const sendWelcome = require('./components/Messages/Welcome').default;

// Opções do menu
const sendCatalog = require('./components/Services/catalog').default;
const connectWithSalesSpecialist = require('./components/Services/salesSpecialist').default;
const sendTechSupport = require('./components/Services/techSupport').default;
const sendAIRecommendation = require('./components/Services/aiRecommendation').default;
const handleExit = require('./components/Services/exit').default;

// Validador de usuário
const { checkActivity, updateActivity, checkAllUsersActivity } = require('./components/Connections/activityChecker');

const userState = {}; // Objeto para rastrear o estado de cada usuário

async function startBot() {
    const { state, saveCreds } = await initializeQRCode();
    const sock = await handleConnection(state, saveCreds);

    // Função para verificar a atividade do usuário a cada 5 segundos
    setInterval(() => {
        checkAllUsersActivity(sock, userState); // Verifica a atividade de todos os usuários
    }, 5000); // Verifica a cada 5 segundos

    // Função para lidar com mensagens recebidas
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];

        if (!msg || !msg.message || msg.key.fromMe) {
            return; // Ignora mensagens inválidas
        }

        const sender = msg.key.remoteJid;

        // Atualiza a atividade do usuário
        updateActivity(sender);

        // Realiza a extração de texto da mensagem recebida
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase().trim();

        if (!text) {
            console.log('Nenhum texto detectado na mensagem.');
            return;
        }

        // Se for a primeira interação com o usuário ou se o usuário estiver inativo
        if (!userState[sender] || userState[sender].status === 'inativo') {
            userState[sender] = { menuShown: false, status: 'ativo' }; // Estado inicial do usuário
            await sendWelcome(sock, sender); // Envia boas-vindas
            await sendMenu(sock, sender); // Envia menu
            userState[sender].menuShown = true; // Marca que o menu foi exibido
        } else if (userState[sender].menuShown) {
            // Se o menu já foi exibido, processa a escolha do menu
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
            await sock.sendMessage(sender, { text: '🤖 Desculpe, não entendi sua escolha. Por favor, selecione uma opção válida.' });
            await sendMenu(sock, sender); // Reenvia o menu para o usuário
            break;
    }
}

startBot();
