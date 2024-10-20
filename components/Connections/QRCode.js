const { useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function initializeQRCode() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    // Retorna o estado e a função de salvar credenciais
    return { state, saveCreds };
}

module.exports = { initializeQRCode };
