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

const userState = {}; // Objeto para rastrear o estado de cada usuário

async function startBot() {
    // Inicializa o QR Code e o estado de autenticação
    const { state, saveCreds } = await initializeQRCode();

    // Estabelece a conexão usando o estado de autenticação
    const sock = await handleConnection(state, saveCreds);

    // Função para lidar com mensagens recebidas
    sock.ev.on('messages.upsert', async (m) => {     
        const msg = m.messages[0];

        if (!msg || !msg.message || msg.key.fromMe) {
            // Ignora se a mensagem não existe ou se foi enviada pelo próprio bot
            return;
        }

        const sender = msg.key.remoteJid;        
        
        // Realiza a extração de texto da mensagem recebida para trata-lá corretamente (Mensagens extendidas ou simples)
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase().trim();
        
        if (!text) {
            console.log('Nenhum texto detectado na mensagem.')
            return;
        }

        console.log('Mensagem recebida:', text);  

        // Se for a primeira interação com o usuário, envia boas-vindas e menu
        if (!userState[sender]) {
            userState[sender] = { menuShown: false }; // Estado inicial do usuário
            await sendWelcome(sock, sender); // Envia boas-vindas
            await sendMenu(sock, sender); // Envia menu
            userState[sender].menuShown = true; // Marca que o menu foi exibido
        } else if (userState[sender].menuShown){
            // Se o menu já foi exibido, processa a escolha do menu
            await processMenuSelection(sock, sender, text);
        }
    });
}

// Função para processar as opções do menu
const processMenuSelection = async (sock, sender, text) => {
    console.log('Processando escolha de menu:', text);

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
            await sendMenu(sock, sender) //Reenvia o menu para o usuário;
            break;
    }
}

startBot();

