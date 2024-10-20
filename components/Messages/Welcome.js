const sendWelcome = async (sock, sender) => {
    const welcomeMessage = `👋🤖: *Olá! Bem-vindo(a) à B&C Eletrônicos!* Ficamos felizes com sua mensagem!\n
Nosso bot está aqui para agilizar seu atendimento, mas fique à vontade para falar com nossos vendedores a qualquer momento.`;

    await sock.sendMessage(sender, { text: welcomeMessage });
};

export default  sendWelcome;
