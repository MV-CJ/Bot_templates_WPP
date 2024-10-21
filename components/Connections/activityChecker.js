// activityChecker.js
const TIMEOUT_LIMIT = 10 * 1000; // 10 segundos em milissegundos

const userActivity = {}; // Armazena a última atividade de cada usuário

const checkActivity = (sock, sender) => {
    const now = Date.now();
    console.log(`Verificando atividade para ${sender}: agora=${now}, última atividade=${userActivity[sender] ? userActivity[sender].lastActive : 'undefined'}`); // Log de verificação

    if (!userActivity[sender]) {
        userActivity[sender] = { lastActive: now, status: 'ativo' }; // Inicializa a atividade do usuário
        return false; // O usuário é ativo na primeira vez
    }

    if (now - userActivity[sender].lastActive > TIMEOUT_LIMIT) {
        console.log(`Usuário ${sender} desconectado devido à inatividade.`); // Log de desconexão
        userActivity[sender].status = 'inativo'; // Muda o status para inativo
        sock.sendMessage(sender, { text: '🤖 Você foi desconectado devido à inatividade. Inicie uma nova conversa quando estiver pronto!' });
        return true; // Retorna true se o usuário foi desconectado
    }

    return false; // Retorna false se o usuário está ativo
};

// Função para atualizar a atividade do usuário
const updateActivity = (sender) => {
    userActivity[sender] = { lastActive: Date.now(), status: 'ativo' }; // Atualiza a última atividade do usuário
    console.log(`Atividade atualizada para ${sender} em ${userActivity[sender].lastActive}`); // Log de atualização
    console.log('Estado atual do userActivity:', userActivity); // Log do estado atual
};

// Função para verificar o status de cada usuário a cada 5 segundos
const checkAllUsersActivity = (sock, userState) => {
    const now = Date.now();
    for (const sender in userState) {
        // Verifique se o usuário está ativo
        if (userState[sender] && userState[sender].status === 'ativo') {
            if (checkActivity(sock, sender)) {
                // Se o usuário foi desconectado, limpa o estado do usuário
                userState[sender] = { menuShown: false, status: 'inativo' }; // Atualiza para inativo
            }
        }
    }
};

// Exporta as funções
module.exports = { checkActivity, updateActivity, userActivity, TIMEOUT_LIMIT, checkAllUsersActivity };
